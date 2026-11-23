
import '@shopify/ui-extensions/preact';
import { render } from 'preact';
import { useState } from 'preact/hooks';

export default function extension() {
  render(<Extension />, document.body);
}

function Extension() {
  const [discountCode, setDiscountCode] = useState('');
  const [message, setMessage] = useState('');
  const [messageTone, setMessageTone] = useState('info');
  const [isApplying, setIsApplying] = useState(false);

  const canUpdateDiscount =
    shopify.instructions.value.discounts.canUpdateDiscountCodes;

  async function handleApplyDiscount() {
    const code = discountCode.trim();

    if (!code) {
      setMessage('Please enter a discount code.');
      setMessageTone('critical');
      return;
    }

    if (!canUpdateDiscount) {
      setMessage('Discount codes cannot be updated in this checkout.');
      setMessageTone('critical');
      return;
    }

    setIsApplying(true);
    setMessage('');

    try {
      const result = await shopify.applyDiscountCodeChange({
        type: 'addDiscountCode',
        code: code,
      });

      if (result.type === 'success') {
        setMessage(`Discount code ${code} applied successfully!`);
        setMessageTone('success');
      } else {
        setMessage('Unable to apply this discount code. Please check the code and try again.');
        setMessageTone('critical');
      }
    } catch (error) {
      console.error('Discount application failed:', error);
      setMessage('Something went wrong. Please try again.');
      setMessageTone('critical');
    } finally {
      setIsApplying(false);
    }
  }

  return (
    <s-banner heading="Apply Discount Code">
      <s-stack gap="base">
        <s-text>
          Enter your discount code below to get your available discount.
        </s-text>

        
<s-text-field
  label="Discount code"
  placeholder="Enter discount code"
  value={discountCode}
  onChange={(event) =>
    setDiscountCode(event.currentTarget.value)
  }
  disabled={isApplying}
/>


        <s-button
          onClick={handleApplyDiscount}
          disabled={isApplying || !canUpdateDiscount}
          loading={isApplying}
        >
          Apply
        </s-button>

        {message && (
          <s-banner tone={messageTone}>
            {message}
          </s-banner>
        )}
      </s-stack>
    </s-banner>
  );
}
