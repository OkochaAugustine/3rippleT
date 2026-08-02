declare module "@paystack/inline-js" {
  class PaystackInline {
    callback(cb: (response: { reference: string }) => void | Promise<void>): void;
    onClose(cb: () => void | Promise<void>): void;
    newTransaction(options: Record<string, unknown>): void;
  }

  export default PaystackInline;
}
