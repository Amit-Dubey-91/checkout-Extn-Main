
import '@shopify/ui-extensions/preact';
import { render } from 'preact';
import { useState } from 'preact/hooks';

export default function extension() {
  render(<Extension />, document.body);
}

function Extension() {
  
  return (
    <s-stack direction="block" gap="base">
    {
      [1,2,3].map((i)=>{
        const heading = shopify.settings.value["usp_title_" + i];
        const paragraph = shopify.settings.value["usp_desc_" + i];
        const image = shopify.settings.value["usp_image_" + i];


        if(heading || paragraph || image){
          return (
         <s-grid gridTemplateColumns = "10% 90%" gap="base">
          <s-image src= {image.toString()}></s-image>

          <s-grid-item>
          <s-heading>{heading}</s-heading>
          <s-paragraph>{paragraph}</s-paragraph>
          </s-grid-item> 

        </s-grid>
          )
        }
        return null;

      })
    }
    </s-stack>
  )
}
