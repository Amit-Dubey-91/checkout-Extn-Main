
// @ts-check

/**
 * @typedef {import("../generated/api").CartValidationsGenerateRunInput} CartValidationsGenerateRunInput
 * @typedef {import("../generated/api").CartValidationsGenerateRunResult} CartValidationsGenerateRunResult
 */

/**
 * @param {CartValidationsGenerateRunInput} input
 * @returns {CartValidationsGenerateRunResult}
 */
export function cartValidationsGenerateRun(input) {
  const step = input.buyerJourney.step;

  // Allow customers to modify their cart freely.
  // Enforce the minimum order only during checkout.
  if (
    step !== "CHECKOUT_INTERACTION" &&
    step !== "CHECKOUT_COMPLETION"
  ) {
    return { operations: [] };
  }

  const MINIMUM_ORDER_VALUE = 100;

  const subtotal = Number(input.cart.cost.subtotalAmount.amount);
  const currencyCode = input.cart.cost.subtotalAmount.currencyCode;

  const errors = [];

  if (currencyCode === "USD" && subtotal < MINIMUM_ORDER_VALUE) {
    errors.push({
      message: "Minimum order value must be $100 to proceed.",
      target: "$.cart",
    });
  }

  return {
    operations: [
      {
        validationAdd: {
          errors,
        },
      },
    ],
  };
}
