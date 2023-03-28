
      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": [
      {
        "kind": "INTERFACE",
        "name": "AggregationOptionInterface",
        "possibleTypes": [
          {
            "name": "AggregationOption"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "AmBlogAuthorInterface",
        "possibleTypes": [
          {
            "name": "AmBlogAuthor"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "AmBlogCategoryInterface",
        "possibleTypes": [
          {
            "name": "AmBlogCategory"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "AmBlogCommentInterface",
        "possibleTypes": [
          {
            "name": "AmBlogComment"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "AmBlogPostInterface",
        "possibleTypes": [
          {
            "name": "AmBlogPost"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "AmBlogTagInterface",
        "possibleTypes": [
          {
            "name": "AmBlogTag"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "AmBlogWidgetInterface",
        "possibleTypes": [
          {
            "name": "AmBlogCategoriesWidget"
          },
          {
            "name": "AmBlogFeaturedPostsWidget"
          },
          {
            "name": "AmBlogRecentCommentsWidget"
          },
          {
            "name": "AmBlogRecentPostsWidget"
          },
          {
            "name": "AmBlogTagsWidget"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "CartAddressInterface",
        "possibleTypes": [
          {
            "name": "BillingCartAddress"
          },
          {
            "name": "ShippingCartAddress"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "CartItemInterface",
        "possibleTypes": [
          {
            "name": "AmGiftCardCartItem"
          },
          {
            "name": "BundleCartItem"
          },
          {
            "name": "ConfigurableCartItem"
          },
          {
            "name": "DownloadableCartItem"
          },
          {
            "name": "SimpleCartItem"
          },
          {
            "name": "VirtualCartItem"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "CategoryInterface",
        "possibleTypes": [
          {
            "name": "CategoryTree"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "CreditMemoItemInterface",
        "possibleTypes": [
          {
            "name": "BundleCreditMemoItem"
          },
          {
            "name": "CreditMemoItem"
          },
          {
            "name": "DownloadableCreditMemoItem"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "CustomizableOptionInterface",
        "possibleTypes": [
          {
            "name": "CustomizableAreaOption"
          },
          {
            "name": "CustomizableCheckboxOption"
          },
          {
            "name": "CustomizableDateOption"
          },
          {
            "name": "CustomizableDropDownOption"
          },
          {
            "name": "CustomizableFieldOption"
          },
          {
            "name": "CustomizableFileOption"
          },
          {
            "name": "CustomizableMultipleOption"
          },
          {
            "name": "CustomizableRadioOption"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "CustomizableProductInterface",
        "possibleTypes": [
          {
            "name": "AmGiftCardProduct"
          },
          {
            "name": "BundleProduct"
          },
          {
            "name": "ConfigurableProduct"
          },
          {
            "name": "DownloadableProduct"
          },
          {
            "name": "SimpleProduct"
          },
          {
            "name": "VirtualProduct"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ErrorInterface",
        "possibleTypes": [
          {
            "name": "InternalError"
          },
          {
            "name": "NoSuchEntityUidError"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "InvoiceItemInterface",
        "possibleTypes": [
          {
            "name": "BundleInvoiceItem"
          },
          {
            "name": "DownloadableInvoiceItem"
          },
          {
            "name": "InvoiceItem"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "LayerFilterItemInterface",
        "possibleTypes": [
          {
            "name": "LayerFilterItem"
          },
          {
            "name": "SwatchLayerFilterItem"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "MediaGalleryInterface",
        "possibleTypes": [
          {
            "name": "ProductImage"
          },
          {
            "name": "ProductVideo"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "OrderItemInterface",
        "possibleTypes": [
          {
            "name": "BundleOrderItem"
          },
          {
            "name": "DownloadableOrderItem"
          },
          {
            "name": "OrderItem"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "PhysicalProductInterface",
        "possibleTypes": [
          {
            "name": "AmGiftCardProduct"
          },
          {
            "name": "BundleProduct"
          },
          {
            "name": "ConfigurableProduct"
          },
          {
            "name": "GroupedProduct"
          },
          {
            "name": "SimpleProduct"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ProductInterface",
        "possibleTypes": [
          {
            "name": "AmGiftCardProduct"
          },
          {
            "name": "BundleProduct"
          },
          {
            "name": "ConfigurableProduct"
          },
          {
            "name": "DownloadableProduct"
          },
          {
            "name": "GroupedProduct"
          },
          {
            "name": "SimpleProduct"
          },
          {
            "name": "VirtualProduct"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ProductLinksInterface",
        "possibleTypes": [
          {
            "name": "ProductLinks"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "RoutableInterface",
        "possibleTypes": [
          {
            "name": "AmGiftCardProduct"
          },
          {
            "name": "BundleProduct"
          },
          {
            "name": "CategoryTree"
          },
          {
            "name": "CmsPage"
          },
          {
            "name": "ConfigurableProduct"
          },
          {
            "name": "DownloadableProduct"
          },
          {
            "name": "GroupedProduct"
          },
          {
            "name": "Landing"
          },
          {
            "name": "SimpleProduct"
          },
          {
            "name": "VirtualProduct"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "ShipmentItemInterface",
        "possibleTypes": [
          {
            "name": "BundleShipmentItem"
          },
          {
            "name": "ShipmentItem"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "SwatchDataInterface",
        "possibleTypes": [
          {
            "name": "ColorSwatchData"
          },
          {
            "name": "ImageSwatchData"
          },
          {
            "name": "TextSwatchData"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "SwatchLayerFilterItemInterface",
        "possibleTypes": [
          {
            "name": "SwatchLayerFilterItem"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "WishlistItemInterface",
        "possibleTypes": [
          {
            "name": "BundleWishlistItem"
          },
          {
            "name": "ConfigurableWishlistItem"
          },
          {
            "name": "DownloadableWishlistItem"
          },
          {
            "name": "GroupedProductWishlistItem"
          },
          {
            "name": "SimpleWishlistItem"
          },
          {
            "name": "VirtualWishlistItem"
          }
        ]
      }
    ]
  }
};
      export default result;
    