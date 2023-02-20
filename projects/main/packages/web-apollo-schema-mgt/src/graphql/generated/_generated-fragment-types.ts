
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AggregationOptionInterface": [
      "AggregationOption"
    ],
    "CartAddressInterface": [
      "BillingCartAddress",
      "ShippingCartAddress"
    ],
    "CartItemInterface": [
      "BundleCartItem",
      "ConfigurableCartItem",
      "DownloadableCartItem",
      "GiftCardCartItem",
      "SimpleCartItem",
      "VirtualCartItem"
    ],
    "CategoryInterface": [
      "CategoryTree"
    ],
    "CreditMemoItemInterface": [
      "BundleCreditMemoItem",
      "CreditMemoItem",
      "DownloadableCreditMemoItem",
      "GiftCardCreditMemoItem"
    ],
    "CustomizableOptionInterface": [
      "CustomizableAreaOption",
      "CustomizableCheckboxOption",
      "CustomizableDateOption",
      "CustomizableDropDownOption",
      "CustomizableFieldOption",
      "CustomizableFileOption",
      "CustomizableMultipleOption",
      "CustomizableRadioOption"
    ],
    "CustomizableProductInterface": [
      "BundleProduct",
      "ConfigurableProduct",
      "DownloadableProduct",
      "GiftCardProduct",
      "SimpleProduct",
      "VirtualProduct"
    ],
    "ErrorInterface": [
      "InternalError",
      "NoSuchEntityUidError"
    ],
    "GiftRegistryDynamicAttributeInterface": [
      "GiftRegistryDynamicAttribute",
      "GiftRegistryRegistrantDynamicAttribute"
    ],
    "GiftRegistryDynamicAttributeMetadataInterface": [
      "GiftRegistryDynamicAttributeMetadata"
    ],
    "GiftRegistryItemInterface": [
      "GiftRegistryItem"
    ],
    "GiftRegistryItemUserErrorInterface": [
      "GiftRegistryItemUserErrors",
      "MoveCartItemsToGiftRegistryOutput"
    ],
    "GiftRegistryOutputInterface": [
      "GiftRegistryOutput",
      "MoveCartItemsToGiftRegistryOutput"
    ],
    "InvoiceItemInterface": [
      "BundleInvoiceItem",
      "DownloadableInvoiceItem",
      "GiftCardInvoiceItem",
      "InvoiceItem"
    ],
    "LayerFilterItemInterface": [
      "LayerFilterItem",
      "SwatchLayerFilterItem"
    ],
    "MediaGalleryInterface": [
      "ProductImage",
      "ProductVideo"
    ],
    "OrderItemInterface": [
      "BundleOrderItem",
      "DownloadableOrderItem",
      "GiftCardOrderItem",
      "OrderItem"
    ],
    "PhysicalProductInterface": [
      "BundleProduct",
      "ConfigurableProduct",
      "GiftCardProduct",
      "GroupedProduct",
      "SimpleProduct"
    ],
    "ProductInterface": [
      "BundleProduct",
      "ConfigurableProduct",
      "DownloadableProduct",
      "GiftCardProduct",
      "GroupedProduct",
      "SimpleProduct",
      "VirtualProduct"
    ],
    "ProductLinksInterface": [
      "ProductLinks"
    ],
    "RoutableInterface": [
      "BundleProduct",
      "CategoryTree",
      "CmsPage",
      "ConfigurableProduct",
      "DownloadableProduct",
      "GiftCardProduct",
      "GroupedProduct",
      "SimpleProduct",
      "VirtualProduct"
    ],
    "ShipmentItemInterface": [
      "BundleShipmentItem",
      "GiftCardShipmentItem",
      "ShipmentItem"
    ],
    "SwatchDataInterface": [
      "ColorSwatchData",
      "ImageSwatchData",
      "TextSwatchData"
    ],
    "SwatchLayerFilterItemInterface": [
      "SwatchLayerFilterItem"
    ],
    "WishlistItemInterface": [
      "BundleWishlistItem",
      "ConfigurableWishlistItem",
      "DownloadableWishlistItem",
      "GiftCardWishlistItem",
      "GroupedProductWishlistItem",
      "SimpleWishlistItem",
      "VirtualWishlistItem"
    ]
  }
};
      export default result;
    