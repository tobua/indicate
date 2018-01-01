/**
 * Returns the width and height of a DOM element using getBoundingClientRect
 * and subtracting the margins.
 **/
 export default (element) => {
   const boundingClientRect = element.getBoundingClientRect()
   const computedStyles = window.getComputedStyle(element)
   const bounds = {
     width: boundingClientRect.width,
     height: boundingClientRect.height
   }

   bounds.width -= parseInt(computedStyles.marginLeft) + parseInt(computedStyles.marginRight)
   bounds.height -= parseInt(computedStyles.marginTop) + parseInt(computedStyles.marginBottom)

   // Round, since other browser functions will round too.
   bounds.width = Math.ceil(bounds.width)
   bounds.height = Math.ceil(bounds.height)

   return bounds
 }
