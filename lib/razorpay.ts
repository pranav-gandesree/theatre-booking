import axios from 'axios';

// Define types for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentOptions {
  amount: number;
  booking_id: string | number;
  customer_name?: string;
  email?: string;
  phone?: string;
  callback_url?: string;
}

interface PaymentVerificationData {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  booking_id: string | number;
}

/**
 * Creates a Razorpay order on the server
 */
export const createRazorpayOrder = async (options: PaymentOptions) => {
  try {
    const response = await axios.post('/api/payment/create', options);
    return response.data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

/**
 * Verifies a Razorpay payment
 */
export const verifyRazorpayPayment = async (data: PaymentVerificationData) => {
  try {
    const response = await axios.post('/api/payment/verify', data);
    return response.data;
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw error;
  }
};

/**
 * Opens the Razorpay payment modal
 */
export const openRazorpayCheckout = async (options: PaymentOptions) => {
  // Create order on server
  const { order, key_id } = await createRazorpayOrder(options);
  
  if (!order || !key_id) {
    throw new Error('Failed to create payment order');
  }
  
  // Load Razorpay script if not already loaded
  if (!window.Razorpay) {
    await loadRazorpayScript();
  }
  
  // Configure Razorpay options
  const razorpayOptions = {
    key: key_id,
    amount: order.amount,
    currency: order.currency,
    name: 'Theatre Booking',
    description: 'Theatre Booking Payment',
    order_id: order.id,
    handler: async function(response: any) {
      // Handle successful payment
      try {
        const verification = await verifyRazorpayPayment({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          booking_id: options.booking_id
        });
        
        return {
          success: true,
          data: verification,
          payment_id: response.razorpay_payment_id
        };
      } catch (error) {
        console.error('Payment verification failed:', error);
        return { success: false, error };
      }
    },
    prefill: {
      name: options.customer_name || '',
      email: options.email || '',
      contact: options.phone || ''
    },
    notes: {
      booking_id: options.booking_id
    },
    theme: {
      color: '#3399cc'
    }
  };
  
  // Open Razorpay checkout
  const razorpay = new window.Razorpay(razorpayOptions);
  razorpay.open();
  
  return new Promise((resolve) => {
    razorpay.on('payment.failed', function(response: any) {
      resolve({
        success: false,
        error: response.error,
        payment_id: null
      });
    });
  });
};

/**
 * Loads the Razorpay script
 */
const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}; 