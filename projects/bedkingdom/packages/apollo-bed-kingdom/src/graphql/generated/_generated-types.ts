/** eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddAmGiftCardProductsToCartInput = {
  /** The unique ID that identifies the customer's cart */
  cart_id: Scalars['String'];
  cart_items: Array<Maybe<AmGiftCardProductCartItemInput>>;
};

export type AddAmGiftCardProductsToCartOutput = {
  __typename?: 'AddAmGiftCardProductsToCartOutput';
  /** Describes the content of the specified shopping cart */
  cart: Cart;
};

/** Defines the bundle products to add to the cart. */
export type AddBundleProductsToCartInput = {
  /** The ID of the cart. */
  cart_id: Scalars['String'];
  /** An array of bundle products to add. */
  cart_items: Array<Maybe<BundleProductCartItemInput>>;
};

/** Contains details about the cart after adding bundle products. */
export type AddBundleProductsToCartOutput = {
  __typename?: 'AddBundleProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

/** Defines the configurable products to add to the cart. */
export type AddConfigurableProductsToCartInput = {
  /** The ID of the cart. */
  cart_id: Scalars['String'];
  /** An array of configurable products to add. */
  cart_items: Array<Maybe<ConfigurableProductCartItemInput>>;
};

/** Contains details about the cart after adding configurable products. */
export type AddConfigurableProductsToCartOutput = {
  __typename?: 'AddConfigurableProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

export type AddDownloadableProductsToCartInput = {
  /** The ID of the cart. */
  cart_id: Scalars['String'];
  /** An array of downloadable products to add. */
  cart_items: Array<Maybe<DownloadableProductCartItemInput>>;
};

/** Contains details about the cart after adding downloadable products. */
export type AddDownloadableProductsToCartOutput = {
  __typename?: 'AddDownloadableProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

/** Contains details about the cart after adding products to it. */
export type AddProductsToCartOutput = {
  __typename?: 'AddProductsToCartOutput';
  /** The cart after products have been added. */
  cart: Cart;
  /** Contains errors encountered while adding an item to the cart. */
  user_errors: Array<Maybe<CartUserInputError>>;
};

/** Contains products to add to an existing compare list. */
export type AddProductsToCompareListInput = {
  /** An array of product IDs to add to the compare list. */
  products: Array<Maybe<Scalars['ID']>>;
  /** The unique identifier of the compare list to modify. */
  uid: Scalars['ID'];
};

/** Contains the customer's wish list and any errors encountered. */
export type AddProductsToWishlistOutput = {
  __typename?: 'AddProductsToWishlistOutput';
  /** An array of errors encountered while adding products to a wish list. */
  user_errors: Array<Maybe<WishListUserInputError>>;
  /** Contains the wish list with all items that were successfully added. */
  wishlist: Wishlist;
};

/** Defines the simple and group products to add to the cart. */
export type AddSimpleProductsToCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** An array of simple and group items to add. */
  cart_items: Array<Maybe<SimpleProductCartItemInput>>;
};

/** Contains details about the cart after adding simple or group products. */
export type AddSimpleProductsToCartOutput = {
  __typename?: 'AddSimpleProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

/** Defines the virtual products to add to the cart. */
export type AddVirtualProductsToCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** An array of virtual products to add. */
  cart_items: Array<Maybe<VirtualProductCartItemInput>>;
};

/** Contains details about the cart after adding virtual products. */
export type AddVirtualProductsToCartOutput = {
  __typename?: 'AddVirtualProductsToCartOutput';
  /** The cart after adding products. */
  cart: Cart;
};

/** Contains the resultant wish list and any error information. */
export type AddWishlistItemsToCartOutput = {
  __typename?: 'AddWishlistItemsToCartOutput';
  /** An array of errors encountered while adding products to the customer's cart. */
  add_wishlist_items_to_cart_user_errors: Array<Maybe<WishlistCartUserInputError>>;
  /** Indicates whether the attempt to add items to the customer's cart was successful. */
  status: Scalars['Boolean'];
  /** Contains the wish list with all items that were successfully added. */
  wishlist: Wishlist;
};

/** Contains information for each filterable option (such as price, category `UID`, and custom attributes). */
export type Aggregation = {
  __typename?: 'Aggregation';
  amshopby_filter_data?: Maybe<AmShopbyFilterData>;
  /** Attribute code of the aggregation group. */
  attribute_code: Scalars['String'];
  /** The number of options in the aggregation group. */
  count?: Maybe<Scalars['Int']>;
  /** The aggregation display name. */
  label?: Maybe<Scalars['String']>;
  /** Array of options for the aggregation. */
  options?: Maybe<Array<Maybe<AggregationOption>>>;
  /** The relative position of the attribute in a layered navigation block. */
  position?: Maybe<Scalars['Int']>;
};

/** An implementation of `AggregationOptionInterface`. */
export type AggregationOption = AggregationOptionInterface & {
  __typename?: 'AggregationOption';
  /** Bottom CMS Block */
  bottom_cms_block_id?: Maybe<Scalars['Int']>;
  /** The number of items that match the aggregation option. */
  count?: Maybe<Scalars['Int']>;
  /** Option Description */
  description?: Maybe<Scalars['String']>;
  /** Filter Code */
  filter_code?: Maybe<Scalars['String']>;
  /** Option Image */
  image?: Maybe<Scalars['String']>;
  /** Is Featured or Show in Brand Slider */
  is_featured?: Maybe<Scalars['Boolean']>;
  /** The display label for an aggregation option. */
  label?: Maybe<Scalars['String']>;
  /** Meta Description */
  meta_description?: Maybe<Scalars['String']>;
  /** Meta Keywords */
  meta_keywords?: Maybe<Scalars['String']>;
  /** Meta Title */
  meta_title?: Maybe<Scalars['String']>;
  /** Short Description */
  short_description?: Maybe<Scalars['String']>;
  /** Small Image */
  slider_image?: Maybe<Scalars['String']>;
  /** Position in Slider */
  slider_position?: Maybe<Scalars['Int']>;
  /** Small Image Alt */
  small_image_alt?: Maybe<Scalars['String']>;
  /** Option Title */
  title?: Maybe<Scalars['String']>;
  /** Top CMS Block */
  top_cms_block_id?: Maybe<Scalars['Int']>;
  /** URL Alias */
  url_alias?: Maybe<Scalars['String']>;
  /** The internal ID that represents the value of the option. */
  value: Scalars['String'];
};

/** Defines aggregation option fields. */
export type AggregationOptionInterface = {
  /** The number of items that match the aggregation option. */
  count?: Maybe<Scalars['Int']>;
  /** The display label for an aggregation option. */
  label?: Maybe<Scalars['String']>;
  /** The internal ID that represents the value of the option. */
  value: Scalars['String'];
};

/** Filter category aggregations in layered navigation. */
export type AggregationsCategoryFilterInput = {
  /** Indicates whether to include only direct subcategories or all children categories at all levels. */
  includeDirectChildrenOnly?: Maybe<Scalars['Boolean']>;
};

/** An input object that specifies the filters used in product aggregations. */
export type AggregationsFilterInput = {
  /** Filter category aggregations in layered navigation. */
  category?: Maybe<AggregationsCategoryFilterInput>;
};

export type AheadworksBlogPost = {
  __typename?: 'AheadworksBlogPost';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** Author is an implementation of AuthorInterface. */
export type AmBlogAuthor = AmBlogAuthorInterface & {
  __typename?: 'AmBlogAuthor';
  /** The ID number assigned to the author */
  author_id?: Maybe<Scalars['Int']>;
  /** The author facebook profile. */
  facebook_profile?: Maybe<Scalars['String']>;
  /** The author instagram profile. */
  instagram_profile?: Maybe<Scalars['String']>;
  /** The author linkedin profile. */
  linkedin_profile?: Maybe<Scalars['String']>;
  /** The author meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** The category meta robots */
  meta_robots?: Maybe<Scalars['String']>;
  /** The author meta tags. */
  meta_tags?: Maybe<Scalars['String']>;
  /** The author meta title. */
  meta_title?: Maybe<Scalars['String']>;
  /** The author name. */
  name?: Maybe<Scalars['String']>;
  /** The author tiktok profile. */
  tiktok_profile?: Maybe<Scalars['String']>;
  /** The author twitter profile. */
  twitter_profile?: Maybe<Scalars['String']>;
  /** The author url key. */
  url_key?: Maybe<Scalars['String']>;
  /** The author youtube profile. */
  youtube_profile?: Maybe<Scalars['String']>;
};

/** The AuthorInterface contains information about author. */
export type AmBlogAuthorInterface = {
  /** The ID number assigned to the author */
  author_id?: Maybe<Scalars['Int']>;
  /** The author facebook profile. */
  facebook_profile?: Maybe<Scalars['String']>;
  /** The author instagram profile. */
  instagram_profile?: Maybe<Scalars['String']>;
  /** The author linkedin profile. */
  linkedin_profile?: Maybe<Scalars['String']>;
  /** The author meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** The category meta robots */
  meta_robots?: Maybe<Scalars['String']>;
  /** The author meta tags. */
  meta_tags?: Maybe<Scalars['String']>;
  /** The author meta title. */
  meta_title?: Maybe<Scalars['String']>;
  /** The author name. */
  name?: Maybe<Scalars['String']>;
  /** The author tiktok profile. */
  tiktok_profile?: Maybe<Scalars['String']>;
  /** The author twitter profile. */
  twitter_profile?: Maybe<Scalars['String']>;
  /** The author url key. */
  url_key?: Maybe<Scalars['String']>;
  /** The author youtube profile. */
  youtube_profile?: Maybe<Scalars['String']>;
};

export type AmBlogAuthors = {
  __typename?: 'AmBlogAuthors';
  /** An array of authors */
  items?: Maybe<Array<Maybe<AmBlogAuthor>>>;
};

export type AmBlogCategories = {
  __typename?: 'AmBlogCategories';
  /** An array of categories */
  items?: Maybe<Array<Maybe<AmBlogCategory>>>;
};

/** AmBlogCategoriesWidget is an implementation of AmBlogWidgetInterface. */
export type AmBlogCategoriesWidget = AmBlogWidgetInterface & {
  __typename?: 'AmBlogCategoriesWidget';
  /** Categories Limit. */
  categories_limit?: Maybe<Scalars['Int']>;
  /** Header Text. */
  header_text?: Maybe<Scalars['String']>;
  /** The widget title. */
  title?: Maybe<Scalars['String']>;
};

/** BlogCategory is an implementation of BlogCategoryInterface. */
export type AmBlogCategory = AmBlogCategoryInterface & {
  __typename?: 'AmBlogCategory';
  /** The ID number assigned to the category */
  category_id?: Maybe<Scalars['Int']>;
  /** The category created at date. */
  created_at?: Maybe<Scalars['String']>;
  /** The category level. */
  level?: Maybe<Scalars['String']>;
  /** The category meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** The category meta robots */
  meta_robots?: Maybe<Scalars['String']>;
  /** The category meta tags. */
  meta_tags?: Maybe<Scalars['String']>;
  /** The category meta title. */
  meta_title?: Maybe<Scalars['String']>;
  /** The category title. */
  name?: Maybe<Scalars['String']>;
  /** The category parent id. */
  parent_id?: Maybe<Scalars['String']>;
  /** The category path. */
  path?: Maybe<Scalars['String']>;
  /** Post Count in Category. */
  post_count?: Maybe<Scalars['Int']>;
  /** The category sort order. */
  sort_order?: Maybe<Scalars['String']>;
  /** The category status. */
  status?: Maybe<Scalars['String']>;
  /** The category store ids. */
  store_id?: Maybe<Scalars['String']>;
  /** The category updated at date. */
  updated_at?: Maybe<Scalars['String']>;
  /** The category url key. */
  url_key?: Maybe<Scalars['String']>;
};

/** The BlogCategoryInterface contains information about category. */
export type AmBlogCategoryInterface = {
  /** The ID number assigned to the category */
  category_id?: Maybe<Scalars['Int']>;
  /** The category created at date. */
  created_at?: Maybe<Scalars['String']>;
  /** The category level. */
  level?: Maybe<Scalars['String']>;
  /** The category meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** The category meta robots */
  meta_robots?: Maybe<Scalars['String']>;
  /** The category meta tags. */
  meta_tags?: Maybe<Scalars['String']>;
  /** The category meta title. */
  meta_title?: Maybe<Scalars['String']>;
  /** The category title. */
  name?: Maybe<Scalars['String']>;
  /** The category parent id. */
  parent_id?: Maybe<Scalars['String']>;
  /** The category path. */
  path?: Maybe<Scalars['String']>;
  /** Post Count in Category. */
  post_count?: Maybe<Scalars['Int']>;
  /** The category sort order. */
  sort_order?: Maybe<Scalars['String']>;
  /** The category status. */
  status?: Maybe<Scalars['String']>;
  /** The category store ids. */
  store_id?: Maybe<Scalars['String']>;
  /** The category updated at date. */
  updated_at?: Maybe<Scalars['String']>;
  /** The category url key. */
  url_key?: Maybe<Scalars['String']>;
};

/** Comment is an implementation of CommentInterface. */
export type AmBlogComment = AmBlogCommentInterface & {
  __typename?: 'AmBlogComment';
  /** The ID number assigned to the comment */
  comment_id?: Maybe<Scalars['Int']>;
  /** The comment created at date. */
  created_at?: Maybe<Scalars['String']>;
  /** The customer id. */
  customer_id?: Maybe<Scalars['String']>;
  /** The customer email. */
  email?: Maybe<Scalars['String']>;
  /** Message. */
  message?: Maybe<Scalars['String']>;
  /** The customer name. */
  name?: Maybe<Scalars['String']>;
  /** Post data(for recent comment widget only) */
  post?: Maybe<AmBlogPost>;
  /** The post id. */
  post_id?: Maybe<Scalars['String']>;
  /** Reply to. */
  reply_to?: Maybe<Scalars['String']>;
  /** The comment status. */
  status?: Maybe<Scalars['String']>;
  /** The store id. */
  store_id?: Maybe<Scalars['String']>;
  /** The comment updated at date. */
  updated_at?: Maybe<Scalars['String']>;
};

/** The CommentInterface contains information about comment. */
export type AmBlogCommentInterface = {
  /** The ID number assigned to the comment */
  comment_id?: Maybe<Scalars['Int']>;
  /** The comment created at date. */
  created_at?: Maybe<Scalars['String']>;
  /** The customer id. */
  customer_id?: Maybe<Scalars['String']>;
  /** The customer email. */
  email?: Maybe<Scalars['String']>;
  /** Message. */
  message?: Maybe<Scalars['String']>;
  /** The customer name. */
  name?: Maybe<Scalars['String']>;
  /** Post data(for recent comment widget only) */
  post?: Maybe<AmBlogPost>;
  /** The post id. */
  post_id?: Maybe<Scalars['String']>;
  /** Reply to. */
  reply_to?: Maybe<Scalars['String']>;
  /** The comment status. */
  status?: Maybe<Scalars['String']>;
  /** The store id. */
  store_id?: Maybe<Scalars['String']>;
  /** The comment updated at date. */
  updated_at?: Maybe<Scalars['String']>;
};

export type AmBlogComments = {
  __typename?: 'AmBlogComments';
  /** An array of comments */
  items?: Maybe<Array<Maybe<AmBlogComment>>>;
};

/** Date Format */
export enum AmBlogDateFormat {
  Passed = 'PASSED',
  Direct = 'DIRECT'
}

/** AmBlogFeaturedPostsWidget is an implementation of AmBlogWidgetInterface. */
export type AmBlogFeaturedPostsWidget = AmBlogWidgetInterface & {
  __typename?: 'AmBlogFeaturedPostsWidget';
  /** An array of posts */
  items?: Maybe<Array<Maybe<AmBlogPost>>>;
  /** The widget title. */
  title?: Maybe<Scalars['String']>;
};

export type AmBlogLeaveCommentInput = {
  email?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  post_id: Scalars['Int'];
  reply_to?: Maybe<Scalars['Int']>;
};

export type AmBlogLeaveCommentOutput = {
  __typename?: 'AmBlogLeaveCommentOutput';
  comment?: Maybe<AmBlogComment>;
};

export type AmBlogLeaveVoteInput = {
  post_id: Scalars['Int'];
  type: AmBlogPagVoteType;
};

export type AmBlogLeaveVoteOutput = {
  __typename?: 'AmBlogLeaveVoteOutput';
  data?: Maybe<AmBlogVoteData>;
  voted?: Maybe<AmBlogVoteData>;
};

/** Blog Vote Type */
export enum AmBlogPagVoteType {
  Update = 'UPDATE',
  Plus = 'PLUS',
  Minus = 'MINUS'
}

/** Blog Page Type */
export enum AmBlogPageType {
  All = 'ALL',
  Category = 'CATEGORY',
  Author = 'AUTHOR',
  Tag = 'TAG'
}

/** Post is an implementation of PostInterface. */
export type AmBlogPost = AmBlogPostInterface & {
  __typename?: 'AmBlogPost';
  /** The post author id. */
  author_id?: Maybe<Scalars['String']>;
  /** The post canonical url. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The post categories. */
  categories?: Maybe<Scalars['String']>;
  /** The post comment count. */
  comment_count?: Maybe<Scalars['Int']>;
  /** The post comment enabled. */
  comments_enabled?: Maybe<Scalars['String']>;
  /** The post created at date. */
  created_at?: Maybe<Scalars['String']>;
  /** The post display short content. */
  display_short_content?: Maybe<Scalars['String']>;
  /** The post full content. */
  full_content?: Maybe<Scalars['String']>;
  /** The post grid class. */
  grid_class?: Maybe<Scalars['String']>;
  /** Is featured. */
  is_featured?: Maybe<Scalars['Boolean']>;
  /** The post thumbnail on list. */
  list_thumbnail?: Maybe<Scalars['String']>;
  /** The post thumbnail alt on list. */
  list_thumbnail_alt?: Maybe<Scalars['String']>;
  /** The post meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** The post meta robots */
  meta_robots?: Maybe<Scalars['String']>;
  /** The post meta tags. */
  meta_tags?: Maybe<Scalars['String']>;
  /** The post meta title. */
  meta_title?: Maybe<Scalars['String']>;
  /** The post notify on enable. */
  notify_on_enable?: Maybe<Scalars['String']>;
  /** The ID number assigned to the post */
  post_id?: Maybe<Scalars['Int']>;
  /** The post thumbnail. */
  post_thumbnail?: Maybe<Scalars['String']>;
  /** The post thumbnail alt. */
  post_thumbnail_alt?: Maybe<Scalars['String']>;
  /** The post published at date. */
  published_at?: Maybe<Scalars['String']>;
  /** The related post ids. */
  related_post_ids?: Maybe<Scalars['String']>;
  /** The post short content. */
  short_content?: Maybe<Scalars['String']>;
  /** The post status. */
  status?: Maybe<Scalars['String']>;
  /** The post tag ids. */
  tag_ids?: Maybe<Scalars['String']>;
  /** The post title. */
  title?: Maybe<Scalars['String']>;
  /** The post updated at date. */
  updated_at?: Maybe<Scalars['String']>;
  /** The post url key. */
  url_key?: Maybe<Scalars['String']>;
  /** The post user define publish. */
  user_define_publish?: Maybe<Scalars['String']>;
  /** The post views. */
  views?: Maybe<Scalars['String']>;
};

/** The PostInterface contains information about post. */
export type AmBlogPostInterface = {
  /** The post author id. */
  author_id?: Maybe<Scalars['String']>;
  /** The post canonical url. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The post categories. */
  categories?: Maybe<Scalars['String']>;
  /** The post comment count. */
  comment_count?: Maybe<Scalars['Int']>;
  /** The post comment enabled. */
  comments_enabled?: Maybe<Scalars['String']>;
  /** The post created at date. */
  created_at?: Maybe<Scalars['String']>;
  /** The post display short content. */
  display_short_content?: Maybe<Scalars['String']>;
  /** The post full content. */
  full_content?: Maybe<Scalars['String']>;
  /** The post grid class. */
  grid_class?: Maybe<Scalars['String']>;
  /** Is featured. */
  is_featured?: Maybe<Scalars['Boolean']>;
  /** The post thumbnail on list. */
  list_thumbnail?: Maybe<Scalars['String']>;
  /** The post thumbnail alt on list. */
  list_thumbnail_alt?: Maybe<Scalars['String']>;
  /** The post meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** The post meta robots */
  meta_robots?: Maybe<Scalars['String']>;
  /** The post meta tags. */
  meta_tags?: Maybe<Scalars['String']>;
  /** The post meta title. */
  meta_title?: Maybe<Scalars['String']>;
  /** The post notify on enable. */
  notify_on_enable?: Maybe<Scalars['String']>;
  /** The ID number assigned to the post */
  post_id?: Maybe<Scalars['Int']>;
  /** The post thumbnail. */
  post_thumbnail?: Maybe<Scalars['String']>;
  /** The post thumbnail alt. */
  post_thumbnail_alt?: Maybe<Scalars['String']>;
  /** The post published at date. */
  published_at?: Maybe<Scalars['String']>;
  /** The related post ids. */
  related_post_ids?: Maybe<Scalars['String']>;
  /** The post short content. */
  short_content?: Maybe<Scalars['String']>;
  /** The post status. */
  status?: Maybe<Scalars['String']>;
  /** The post tag ids. */
  tag_ids?: Maybe<Scalars['String']>;
  /** The post title. */
  title?: Maybe<Scalars['String']>;
  /** The post updated at date. */
  updated_at?: Maybe<Scalars['String']>;
  /** The post url key. */
  url_key?: Maybe<Scalars['String']>;
  /** The post user define publish. */
  user_define_publish?: Maybe<Scalars['String']>;
  /** The post views. */
  views?: Maybe<Scalars['String']>;
};

export type AmBlogPosts = {
  __typename?: 'AmBlogPosts';
  /** All Collection Size */
  all_post_size?: Maybe<Scalars['Int']>;
  /** An array of posts */
  items?: Maybe<Array<Maybe<AmBlogPost>>>;
};

export type AmBlogProduct = {
  __typename?: 'AmBlogProduct';
  /** The attribute set assigned to the product. */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** The ID number assigned to the product. */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** Is product salable */
  is_salable?: Maybe<Scalars['Boolean']>;
  /** A number representing the product's manufacturer. */
  manufacturer?: Maybe<Scalars['Int']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  /**
   * A ProductPrices object, indicating the price of an item.
   * @deprecated Use price_range for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** A PriceRange object, indicating the range of prices for the product */
  price_range: PriceRange;
  /** An array of ProductLinks objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Product rating. */
  rating_summary?: Maybe<Scalars['Int']>;
  /** Product reviews count. */
  reviews_count?: Maybe<Scalars['Int']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /** The beginning date that a product has a special price. */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date that a product has a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use __typename instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
};

export type AmBlogProducts = {
  __typename?: 'AmBlogProducts';
  /** An array of related products for post */
  items?: Maybe<Array<Maybe<AmBlogProduct>>>;
};

/** AmBlogRecentCommentsWidget is an implementation of AmBlogWidgetInterface. */
export type AmBlogRecentCommentsWidget = AmBlogWidgetInterface & {
  __typename?: 'AmBlogRecentCommentsWidget';
  /** Comments Limit. */
  comments_limit?: Maybe<Scalars['Int']>;
  /** Date Format. */
  date_manner?: Maybe<Scalars['String']>;
  /** Show Date for Recent Comments. */
  display_date?: Maybe<Scalars['Boolean']>;
  /** Header Text. */
  header_text?: Maybe<Scalars['String']>;
  /** An array of comments */
  items?: Maybe<Array<Maybe<AmBlogComment>>>;
  /** The widget title. */
  title?: Maybe<Scalars['String']>;
};

/** AmBlogRecentPostsWidget is an implementation of AmBlogWidgetInterface. */
export type AmBlogRecentPostsWidget = AmBlogWidgetInterface & {
  __typename?: 'AmBlogRecentPostsWidget';
  /** Post Categories for the Widget. */
  amasty_widget_categories?: Maybe<Scalars['String']>;
  /** Post Tags for the Widget. */
  amasty_widget_tags?: Maybe<Scalars['String']>;
  /** Date Format. */
  date_manner?: Maybe<Scalars['String']>;
  /** Show Date for Recent Comments. */
  display_date?: Maybe<Scalars['Boolean']>;
  /** Show Short Content for Recent Posts. */
  display_short?: Maybe<Scalars['Boolean']>;
  /** Header Text. */
  header_text?: Maybe<Scalars['String']>;
  /** An array of posts */
  items?: Maybe<Array<Maybe<AmBlogPost>>>;
  /** Post Limit. */
  posts_limit?: Maybe<Scalars['Int']>;
  /** Short Content Limit. */
  short_limit?: Maybe<Scalars['Int']>;
  /** Show Post Images in the Widget View. */
  show_images?: Maybe<Scalars['Boolean']>;
  /** The widget title. */
  title?: Maybe<Scalars['String']>;
};

/** Array of configs. */
export type AmBlogSetting = {
  __typename?: 'AmBlogSetting';
  comments_allow_guests?: Maybe<Scalars['Boolean']>;
  comments_ask_email?: Maybe<Scalars['Boolean']>;
  comments_ask_name?: Maybe<Scalars['Boolean']>;
  comments_autoapprove?: Maybe<Scalars['Boolean']>;
  comments_display_date?: Maybe<Scalars['Boolean']>;
  comments_display_short?: Maybe<Scalars['Boolean']>;
  comments_gdpr?: Maybe<Scalars['Boolean']>;
  comments_gdpr_text?: Maybe<Scalars['String']>;
  comments_record_limit?: Maybe<Scalars['Int']>;
  comments_use_comments?: Maybe<Scalars['Boolean']>;
  display_settings_display_at_category?: Maybe<Scalars['Boolean']>;
  display_settings_display_at_footer?: Maybe<Scalars['Boolean']>;
  display_settings_display_at_toolbar?: Maybe<Scalars['Boolean']>;
  display_settings_label?: Maybe<Scalars['String']>;
  is_show_related_posts_on_product_page?: Maybe<Scalars['Boolean']>;
  is_show_related_products_on_post_page?: Maybe<Scalars['Boolean']>;
  layout_desktop_list?: Maybe<Scalars['String']>;
  layout_desktop_post?: Maybe<Scalars['String']>;
  layout_mobile_list?: Maybe<Scalars['String']>;
  layout_mobile_post?: Maybe<Scalars['String']>;
  list_count_per_page?: Maybe<Scalars['Int']>;
  post_categories_limit?: Maybe<Scalars['Int']>;
  post_date_manner?: Maybe<Scalars['String']>;
  post_display_author?: Maybe<Scalars['Boolean']>;
  post_display_categories?: Maybe<Scalars['Boolean']>;
  post_display_tags?: Maybe<Scalars['Boolean']>;
  post_helpful?: Maybe<Scalars['Boolean']>;
  post_image_height?: Maybe<Scalars['Int']>;
  post_image_width?: Maybe<Scalars['Int']>;
  post_related_products_block_title?: Maybe<Scalars['String']>;
  product_related_posts_tab_title?: Maybe<Scalars['String']>;
  recent_posts_display_date?: Maybe<Scalars['Boolean']>;
  recent_posts_display_image?: Maybe<Scalars['Boolean']>;
  recent_posts_display_short?: Maybe<Scalars['Boolean']>;
  recent_posts_image_height?: Maybe<Scalars['Int']>;
  recent_posts_image_width?: Maybe<Scalars['Int']>;
  recent_posts_record_limit?: Maybe<Scalars['Int']>;
  recent_posts_short_limit?: Maybe<Scalars['String']>;
  search_engine_bread?: Maybe<Scalars['String']>;
  search_engine_meta_description?: Maybe<Scalars['String']>;
  search_engine_meta_keywords?: Maybe<Scalars['String']>;
  search_engine_meta_robots?: Maybe<Scalars['String']>;
  search_engine_meta_title?: Maybe<Scalars['String']>;
  search_engine_organization_name?: Maybe<Scalars['String']>;
  search_engine_route?: Maybe<Scalars['String']>;
  search_engine_title?: Maybe<Scalars['String']>;
  search_engine_title_suffix?: Maybe<Scalars['String']>;
  social_buttons?: Maybe<Array<Maybe<Scalars['String']>>>;
  social_enabled?: Maybe<Scalars['Boolean']>;
  tags_minimal_post_count?: Maybe<Scalars['Int']>;
};

/** TagCategory is an implementation of TagInterface. */
export type AmBlogTag = AmBlogTagInterface & {
  __typename?: 'AmBlogTag';
  /** The tag meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** The tag meta robots */
  meta_robots?: Maybe<Scalars['String']>;
  /** The tag meta tags. */
  meta_tags?: Maybe<Scalars['String']>;
  /** The tag meta title. */
  meta_title?: Maybe<Scalars['String']>;
  /** The tag title. */
  name?: Maybe<Scalars['String']>;
  /** The ID number assigned to the tag */
  tag_id?: Maybe<Scalars['Int']>;
  /** The category url key. */
  url_key?: Maybe<Scalars['String']>;
};

/** The TagInterface contains information about tag. */
export type AmBlogTagInterface = {
  /** The tag meta description */
  meta_description?: Maybe<Scalars['String']>;
  /** The tag meta robots */
  meta_robots?: Maybe<Scalars['String']>;
  /** The tag meta tags. */
  meta_tags?: Maybe<Scalars['String']>;
  /** The tag meta title. */
  meta_title?: Maybe<Scalars['String']>;
  /** The tag title. */
  name?: Maybe<Scalars['String']>;
  /** The ID number assigned to the tag */
  tag_id?: Maybe<Scalars['Int']>;
  /** The category url key. */
  url_key?: Maybe<Scalars['String']>;
};

export type AmBlogTags = {
  __typename?: 'AmBlogTags';
  /** An array of tags */
  items?: Maybe<Array<Maybe<AmBlogTag>>>;
};

/** AmBlogTagsWidget is an implementation of AmBlogWidgetInterface. */
export type AmBlogTagsWidget = AmBlogWidgetInterface & {
  __typename?: 'AmBlogTagsWidget';
  /** An array of tags */
  items?: Maybe<Array<Maybe<AmBlogTag>>>;
  /** The widget title. */
  title?: Maybe<Scalars['String']>;
};

export type AmBlogVoteData = {
  __typename?: 'AmBlogVoteData';
  minus?: Maybe<Scalars['Int']>;
  plus?: Maybe<Scalars['Int']>;
};

/** The AmBlogWidgetInterface contains information about widgets. */
export type AmBlogWidgetInterface = {
  /** The widget title. */
  title?: Maybe<Scalars['String']>;
};

export type AmFormSubmitInput = {
  form_data?: Maybe<Scalars['String']>;
};

export type AmFormSubmitOutput = {
  __typename?: 'AmFormSubmitOutput';
  /** Result status */
  status?: Maybe<Scalars['Int']>;
};

/** Contains details about the gift card account */
export type AmGiftCardAccount = {
  __typename?: 'AmGiftCardAccount';
  /** Gift card account code */
  code?: Maybe<Scalars['String']>;
  /** Current balance of gift card */
  current_balance?: Maybe<Money>;
  /** Gift card expiration date */
  expiration_date?: Maybe<Scalars['String']>;
  /** Gift card status */
  status?: Maybe<Scalars['String']>;
};

export type AmGiftCardAccountInput = {
  /** Defines the input required to identify the gift card account */
  am_gift_card_code: Scalars['String'];
};

export type AmGiftCardCartItem = CartItemInterface & {
  __typename?: 'AmGiftCardCartItem';
  /** Image of the gift card product */
  am_giftcard_image?: Maybe<Scalars['String']>;
  /** Options of the gift card product */
  am_giftcard_options: Array<Maybe<AmGiftCardOption>>;
  date_picker?: Maybe<Scalars['String']>;
  delivery_warning?: Maybe<Scalars['String']>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String'];
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID'];
};

export type AmGiftCardCodeInAccountInput = {
  /** Gift card code. */
  am_giftcard_code: Scalars['String'];
};

/** This enumeration defines the type of fee that can be applied to gift card */
export enum AmGiftCardFeeTypeEnum {
  Fixed = 'FIXED',
  Percent = 'PERCENT'
}

/** AmGiftCardImage contains image data of gift card */
export type AmGiftCardImage = {
  __typename?: 'AmGiftCardImage';
  /** Unique ID of gift card image */
  image_id?: Maybe<Scalars['Int']>;
  /** The path of Gift Card Image */
  image_path?: Maybe<Scalars['String']>;
  /** Either Enabled or Disabled */
  status?: Maybe<Scalars['Int']>;
  /** Gift Card image title */
  title?: Maybe<Scalars['String']>;
  /** The unique ID for a Image object */
  uid?: Maybe<Scalars['ID']>;
  /** Is user uploaded flag */
  user_upload?: Maybe<Scalars['Boolean']>;
};

export type AmGiftCardMutationCommonOutput = {
  __typename?: 'AmGiftCardMutationCommonOutput';
  /** Is mutation was failed. */
  error?: Maybe<Scalars['Boolean']>;
  /** Result message. */
  message?: Maybe<Scalars['String']>;
};

export type AmGiftCardOption = {
  __typename?: 'AmGiftCardOption';
  /** Code of gift card option */
  code?: Maybe<Scalars['String']>;
  /** Label of gift card option */
  label?: Maybe<Scalars['String']>;
  /** Value of gift card option */
  value?: Maybe<Scalars['String']>;
};

export type AmGiftCardOptionsInput = {
  /** Predefined price of gift card */
  am_giftcard_amount?: Maybe<Scalars['Float']>;
  /** Custom price of gift card */
  am_giftcard_amount_custom?: Maybe<Scalars['Float']>;
  /** Custom image of gift card */
  am_giftcard_custom_image?: Maybe<Scalars['String']>;
  /** Delivery date of gift card */
  am_giftcard_date_delivery?: Maybe<Scalars['String']>;
  /** Timezone of gift card delivery date */
  am_giftcard_date_delivery_timezone?: Maybe<Scalars['String']>;
  /** Image of gift card */
  am_giftcard_image?: Maybe<Scalars['Int']>;
  /** Message from person who bought gift card that will come with product */
  am_giftcard_message?: Maybe<Scalars['String']>;
  /** Email of person who will recieve virtual gift card */
  am_giftcard_recipient_email?: Maybe<Scalars['String']>;
  /** Name of person who will recieve gift card */
  am_giftcard_recipient_name?: Maybe<Scalars['String']>;
  /** Name of person who bought the gift card */
  am_giftcard_sender_name?: Maybe<Scalars['String']>;
  /** Card type for combined gift cards. Can be either printed virtual or combined */
  am_giftcard_type?: Maybe<Scalars['Int']>;
  /** Flag to mark if gift card should be delivired to specified date */
  is_date_delivery?: Maybe<Scalars['Boolean']>;
};

export type AmGiftCardPreview = {
  __typename?: 'AmGiftCardPreview';
  /** Rendered preview of Gift Card. */
  content?: Maybe<Scalars['String']>;
};

export type AmGiftCardPreviewInput = {
  /** Predefined price of gift card */
  am_giftcard_amount?: Maybe<Scalars['Float']>;
  /** Custom price of gift card */
  am_giftcard_amount_custom?: Maybe<Scalars['Float']>;
  /** Custom Image name with extension received from image upload API endpoint. */
  am_giftcard_custom_image?: Maybe<Scalars['String']>;
  /** Image of gift card */
  am_giftcard_image?: Maybe<Scalars['Int']>;
  /** Message from person who bought gift card that will come with product */
  am_giftcard_message?: Maybe<Scalars['String']>;
  /** Name of person who will recieve gift card */
  am_giftcard_recipient_name?: Maybe<Scalars['String']>;
  /** Name of person who bought the gift card */
  am_giftcard_sender_name?: Maybe<Scalars['String']>;
};

/** AmGiftCardPrice contains data of defined value of gift card */
export type AmGiftCardPrice = {
  __typename?: 'AmGiftCardPrice';
  /** An internal attribute ID */
  attribute_id?: Maybe<Scalars['Int']>;
  /** Unique ID of gift card price */
  price_id?: Maybe<Scalars['Int']>;
  /** The value of the price */
  value?: Maybe<GiftCardPriceValue>;
  /** ID of the website price is assigned to */
  website_id?: Maybe<Scalars['Int']>;
};

/** AmGiftCardProduct defines properties of a gift card, including arrays of availiable values and images of the specific gift card */
export type AmGiftCardProduct = ProductInterface & PhysicalProductInterface & CustomizableProductInterface & RoutableInterface & {
  __typename?: 'AmGiftCardProduct';
  /** Add to cart url. */
  add_to_cart_url?: Maybe<Scalars['String']>;
  /** Add to wishlist information. */
  add_to_wishlist?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  additional_features?: Maybe<Scalars['String']>;
  /** Indicates whether customers have the ability to set the value of the gift card */
  am_allow_open_amount?: Maybe<Scalars['Boolean']>;
  /** Email template unique ID which will be send to the virtual or combined cart receiver */
  am_email_template?: Maybe<Scalars['String']>;
  /** Indicates whether gift card have additional fee for purchase */
  am_giftcard_fee_enable?: Maybe<Scalars['Boolean']>;
  /** Either PERCENT or FIXED */
  am_giftcard_fee_type?: Maybe<AmGiftCardFeeTypeEnum>;
  /** Value of fee */
  am_giftcard_fee_value?: Maybe<Scalars['Float']>;
  /** The number of days after purchase until the gift card expires */
  am_giftcard_lifetime?: Maybe<Scalars['Int']>;
  /** An array that contains information about the values of gift card */
  am_giftcard_prices?: Maybe<Array<Maybe<AmGiftCardPrice>>>;
  /** Either VIRTUAL PRINTED OR COMBINED */
  am_giftcard_type?: Maybe<AmGiftCardTypeEnum>;
  /** An array that contains information about associated images to Gift Card */
  am_images?: Maybe<Array<Maybe<AmGiftCardImage>>>;
  /** The maximum acceptable value of an open amount gift card */
  am_open_amount_max?: Maybe<GiftCardPriceValue>;
  /** The minimum acceptable value of an open amount gift card */
  am_open_amount_min?: Maybe<GiftCardPriceValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  assembly_type?: Maybe<Scalars['Int']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_colours?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_sizes?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  back_stock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  backstock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  barcode?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  base_slat_type?: Maybe<Scalars['Int']>;
  /** Custom data in bedkingdom website */
  bed_data?: Maybe<BedData>;
  /** @deprecated Use the `custom_attributes` field instead. */
  benifts?: Maybe<Scalars['String']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  chair_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  colour?: Maybe<Scalars['String']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  delivery?: Maybe<Scalars['Int']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dimentions?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dining_chairs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_drawers?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_fabric?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  exchange_return_upgrade?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  feet_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  filling_type_search?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  fold_mechanism?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  free_delivery?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  furniture_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ggiftcard_amount_config?: Maybe<Scalars['String']>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gtin?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  guarantee?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  headboard_included?: Maybe<Scalars['Int']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ladder?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  leg_diameter?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  length?: Maybe<Scalars['String']>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  matching_headboard?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  material_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_bundle?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_depth?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_tention?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_turn?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_type?: Maybe<Scalars['Int']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mpn?: Maybe<Scalars['String']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  nocupboards?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  number_of_springs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  numberdrawers?: Maybe<Scalars['Int']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  optional_extras?: Maybe<Scalars['Int']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Product url. */
  product_url?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ranges?: Maybe<Scalars['Int']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  room_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  seat_type?: Maybe<Scalars['Int']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  size?: Maybe<Scalars['Int']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  split?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type_search?: Maybe<Scalars['Int']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  stompa_colours?: Maybe<Scalars['Int']>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_top_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  temperature_control_fabric?: Maybe<Scalars['Int']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  top_bunk_size?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_options?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_size?: Maybe<Scalars['Int']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  udropship_vendor?: Maybe<Scalars['Int']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  wardrobe_doors?: Maybe<Scalars['Int']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']>;
};


/** AmGiftCardProduct defines properties of a gift card, including arrays of availiable values and images of the specific gift card */
export type AmGiftCardProductReviewsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type AmGiftCardProductCartItemInput = {
  data: CartItemInput;
  /** Defines input with gift card product options */
  gift_card_options: AmGiftCardOptionsInput;
};

export type AmGiftCardSettings = {
  __typename?: 'AmGiftCardSettings';
  /** Allowed product types array. */
  allowedProductTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Gift Card fields array. */
  giftCardFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Gift Card Lifetime. */
  giftCardLifetime?: Maybe<Scalars['Int']>;
  /** Gift Card timezones array. */
  giftCardTimezones?: Maybe<Array<Maybe<AmGiftCardTimezone>>>;
  /** Image uploading tooltip. */
  imageUploadTooltip?: Maybe<Scalars['String']>;
  /** Is allowed to use Gift Card by user who bought it. */
  isAllowUseThemselves?: Maybe<Scalars['Boolean']>;
  /** Is allowed to upload images by customers. */
  isAllowUserImages?: Maybe<Scalars['Boolean']>;
  /** Is module enabled flag. */
  isEnabled?: Maybe<Scalars['Boolean']>;
  /** Is allowed to pay extra fee via Gift Card. */
  isExtraFeePaidAllowed?: Maybe<Scalars['Boolean']>;
  /** Is show on checkout and cart pages flag. */
  isShowOnCartAndCheckout?: Maybe<Scalars['Boolean']>;
  /** Is allowed to pay shipping via Gift Card. */
  isSippingPaidAllowed?: Maybe<Scalars['Boolean']>;
  /** Is allowed to pay tax via Gift Card. */
  isTaxPaidAllowed?: Maybe<Scalars['Boolean']>;
};

export type AmGiftCardTimezone = {
  __typename?: 'AmGiftCardTimezone';
  /** Timezone label */
  label?: Maybe<Scalars['String']>;
  /** Timezone unique value */
  value?: Maybe<Scalars['String']>;
};

/** This enumeration defines the types of gift cards */
export enum AmGiftCardTypeEnum {
  Virtual = 'VIRTUAL',
  Printed = 'PRINTED',
  Combined = 'COMBINED'
}

/** Label info */
export type AmLabel = {
  __typename?: 'AmLabel';
  /** Label customer group */
  customer_group_ids?: Maybe<Scalars['String']>;
  /** Label image. */
  image?: Maybe<Scalars['String']>;
  /** Is label visible */
  is_visible?: Maybe<Scalars['Boolean']>;
  /** Label id. */
  label_id?: Maybe<Scalars['Int']>;
  /** Label name. */
  name?: Maybe<Scalars['String']>;
  /** Label position. */
  position?: Maybe<Scalars['String']>;
  /** Product id. */
  product_id?: Maybe<Scalars['Int']>;
  /** Label image size. Percent of the product image. */
  size?: Maybe<Scalars['String']>;
  /** Label css style. */
  style?: Maybe<Scalars['String']>;
  /** A settings for label tooltip */
  tooltip_settings?: Maybe<AmLabelTooltip>;
  /** Label text. */
  txt?: Maybe<Scalars['String']>;
};

export type AmLabelList = {
  __typename?: 'AmLabelList';
  /** Labels. */
  items?: Maybe<Array<Maybe<AmLabel>>>;
};

/** Label Mode */
export enum AmLabelMode {
  Category = 'CATEGORY',
  Product = 'PRODUCT'
}

export type AmLabelSetting = {
  __typename?: 'AmLabelSetting';
  /** Category Page Label Container. */
  category_container?: Maybe<Scalars['String']>;
  /** Labels Alignment. */
  labels_alignment?: Maybe<Scalars['Int']>;
  /** Margin between labels, px. */
  margin_between?: Maybe<Scalars['Int']>;
  /** Max Number of Labels on One Product. */
  max_labels?: Maybe<Scalars['Int']>;
  /** Product Page Label Container. */
  product_container?: Maybe<Scalars['String']>;
  /** Show Several Labels on the Same Place. */
  show_several_on_place?: Maybe<Scalars['Int']>;
};

export type AmLabelTooltip = {
  __typename?: 'AmLabelTooltip';
  /** Tooltip color */
  color?: Maybe<Scalars['String']>;
  /** Tooltip status */
  status?: Maybe<Scalars['Int']>;
  /** Tooltip text */
  text?: Maybe<Scalars['String']>;
  /** Tooltip text color */
  text_color?: Maybe<Scalars['String']>;
};

export type AmMostviewedBundleItem = {
  __typename?: 'AmMostviewedBundleItem';
  /** Custom discount. */
  discount_amount?: Maybe<Scalars['Float']>;
  /** Product model. */
  product?: Maybe<ProductInterface>;
  /** Selected(required) qty. */
  qty?: Maybe<Scalars['Int']>;
};

export type AmMostviewedBundlePack = {
  __typename?: 'AmMostviewedBundlePack';
  /** Apply Discount to the Main Product. */
  apply_for_parent?: Maybe<Scalars['Boolean']>;
  /** Title. */
  block_title?: Maybe<Scalars['String']>;
  /** Upsell Message. */
  cart_message?: Maybe<Scalars['String']>;
  /** Discount Amount. */
  discount_amount?: Maybe<Scalars['Int']>;
  /** Discount Type. */
  discount_type?: Maybe<Scalars['Int']>;
  /** Bundle Pack Items. */
  items?: Maybe<Array<Maybe<AmMostviewedBundleItem>>>;
};

export type AmMostviewedBundlePacks = {
  __typename?: 'AmMostviewedBundlePacks';
  /** Display Bundle Pack in Cart. */
  is_display_cart_block?: Maybe<Scalars['Boolean']>;
  /** Display Upsell Message in Cart. */
  is_display_cart_message?: Maybe<Scalars['Boolean']>;
  /** Add Bundle Packs Link to Top Menu. */
  is_top_menu_enabled?: Maybe<Scalars['Int']>;
  /** An array of bundle packs. */
  items?: Maybe<Array<Maybe<AmMostviewedBundlePack>>>;
  /** Main Product. */
  main_product?: Maybe<ProductInterface>;
};

export type AmMostviewedRelated = {
  __typename?: 'AmMostviewedRelated';
  /** Display 'Add to Cart' Button. */
  add_to_cart?: Maybe<Scalars['Boolean']>;
  /** Block Layout. */
  block_layout?: Maybe<Scalars['Int']>;
  /** Block Title. */
  block_title?: Maybe<Scalars['String']>;
  /** Display 'Add to Compare' Button. */
  display_add_to_compare?: Maybe<Scalars['Boolean']>;
  /** Display 'Add to Wish List' Button. */
  display_add_to_wishlist?: Maybe<Scalars['Boolean']>;
  /** An array of products. */
  items?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Block Position. */
  position?: Maybe<Scalars['String']>;
};

export type AmMostviewedRelatedRules = {
  __typename?: 'AmMostviewedRelatedRules';
  /** An array of Related Rules. */
  items?: Maybe<Array<Maybe<AmMostviewedRelated>>>;
};

export type AmShopbyCustomFilterTypeInput = {
  /** Rating Value */
  eq?: Maybe<Scalars['Int']>;
};

export type AmShopbyFilterData = {
  __typename?: 'AmShopbyFilterData';
  /** Add From-To Widget */
  add_from_to_widget?: Maybe<Scalars['Boolean']>;
  /** Show Only when Any Option of Attributes is Selected */
  attributes_filter?: Maybe<Scalars['String']>;
  /** Show Only if the Following Option is Selected */
  attributes_options_filter?: Maybe<Scalars['String']>;
  /** Show in the Block */
  block_position?: Maybe<Scalars['Int']>;
  /** Categories Filter */
  categories_filter?: Maybe<Scalars['String']>;
  /** Category Tree Depth */
  category_tree_depth?: Maybe<Scalars['Int']>;
  /** Category Tree Display Mode */
  category_tree_display_mode?: Maybe<Scalars['Int']>;
  /** Display Mode */
  display_mode?: Maybe<Scalars['Int']>;
  /** Display Mode */
  display_mode_label?: Maybe<Scalars['String']>;
  /** Filter Code */
  filter_code?: Maybe<Scalars['String']>;
  /** Allow Google to FOLLOW Links on the Category Page with the Filter Applied */
  follow_mode?: Maybe<Scalars['Int']>;
  /** Allow Google to INDEX the Category Page with the Filter Applied */
  index_mode?: Maybe<Scalars['Int']>;
  /** Expand */
  is_expanded?: Maybe<Scalars['Int']>;
  /** Allow Multiselect */
  is_multiselect?: Maybe<Scalars['Boolean']>;
  /** Generate SEO URL */
  is_seo_significant?: Maybe<Scalars['Boolean']>;
  /** Show Search Box */
  is_show_search_box?: Maybe<Scalars['Boolean']>;
  /** Tooltips Enabled */
  is_tooltips_enabled?: Maybe<Scalars['Boolean']>;
  /** Multiple Values Logic */
  is_use_and_logic?: Maybe<Scalars['Boolean']>;
  /** Show the searchbox if the number of options more than */
  limit_options_show_search_box?: Maybe<Scalars['Int']>;
  /** Number of Unfolded Options */
  number_unfolded_options?: Maybe<Scalars['Int']>;
  /** Position */
  position?: Maybe<Scalars['Int']>;
  /** Position Label */
  position_label?: Maybe<Scalars['Int']>;
  /** Add rel='nofollow' to Filter Links */
  rel_nofollow?: Maybe<Scalars['Int']>;
  /** Render All Categories Tree */
  render_all_categories_tree?: Maybe<Scalars['Boolean']>;
  /** Render Categories Level */
  render_categories_level?: Maybe<Scalars['Int']>;
  /** Show Icon on the Product Page */
  show_icons_on_product?: Maybe<Scalars['Boolean']>;
  /** Show Product Quantities */
  show_product_quantities?: Maybe<Scalars['Int']>;
  /** Position in Sidebar */
  side_position?: Maybe<Scalars['Int']>;
  /** Maximum Slider Value */
  slider_max?: Maybe<Scalars['Float']>;
  /** Minimum Slider Value */
  slider_min?: Maybe<Scalars['Float']>;
  /** Slider Step */
  slider_step?: Maybe<Scalars['Float']>;
  /** Sort Options By */
  sort_options_by?: Maybe<Scalars['Int']>;
  /** Expand Subcategories */
  subcategories_expand?: Maybe<Scalars['Int']>;
  /** Subcategories View */
  subcategories_view?: Maybe<Scalars['Int']>;
  /** Tooltip */
  tooltip?: Maybe<Scalars['String']>;
  /** Tooltip Image */
  tooltips_image?: Maybe<Scalars['String']>;
  /** Position in Top */
  top_position?: Maybe<Scalars['Int']>;
  /** Unit Label */
  units_label?: Maybe<Scalars['String']>;
  /** Measure Units */
  units_label_use_currency_symbol?: Maybe<Scalars['Int']>;
  /** Visible in Categories */
  visible_in_categories?: Maybe<Scalars['String']>;
};

export type AmastyBlogPost = {
  __typename?: 'AmastyBlogPost';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type AmastyFaqQuestion = {
  __typename?: 'AmastyFaqQuestion';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type AnswerQuestion = {
  __typename?: 'AnswerQuestion';
  answer?: Maybe<Scalars['String']>;
  is_show_full_answer?: Maybe<Scalars['Boolean']>;
  question_id?: Maybe<Scalars['String']>;
  question_link?: Maybe<Scalars['String']>;
  short_answer?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** Contains the applied gift card with applied and remaining balance */
export type AppliedAmGiftCard = {
  __typename?: 'AppliedAmGiftCard';
  /** Applied balance to the current cart */
  applied_balance?: Maybe<Money>;
  /** Gift card account code */
  code?: Maybe<Scalars['String']>;
  /** Current balance remaining on gift card */
  current_balance?: Maybe<Money>;
  /** Gift card expiration date */
  expiration_date?: Maybe<Scalars['String']>;
};

/** Contains the applied coupon code. */
export type AppliedCoupon = {
  __typename?: 'AppliedCoupon';
  /** The coupon code the shopper applied to the card. */
  code: Scalars['String'];
};

/** Defines the input required to run the applyAmGiftCardToCart mutation */
export type ApplyAmGiftCardToCartInput = {
  /** The gift card code to be applied to the cart */
  am_gift_card_code: Scalars['String'];
  /** The unique ID that identifies the customer's cart */
  cart_id: Scalars['String'];
};

/** Defines the possible output for the applyAmGiftCardToCart mutation */
export type ApplyAmGiftCardToCartOutput = {
  __typename?: 'ApplyAmGiftCardToCartOutput';
  /** Describes the contents of the specified shopping cart */
  cart: Cart;
};

/** Specifies the coupon code to apply to the cart. */
export type ApplyCouponToCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** A valid coupon code. */
  coupon_code: Scalars['String'];
};

/** Contains details about the cart after applying a coupon. */
export type ApplyCouponToCartOutput = {
  __typename?: 'ApplyCouponToCartOutput';
  /** The cart after applying a coupon. */
  cart: Cart;
};

/** AreaInput defines the parameters which will be used for filter by specified location. */
export type AreaInput = {
  /** The radius for the search in KM. */
  radius: Scalars['Int'];
  /** The country code where search must be performed. Required parameter together with region, city or postcode. */
  search_term: Scalars['String'];
};

export type Assets = {
  __typename?: 'Assets';
  /** The payment method logo url (descriptive) */
  descriptive?: Maybe<Scalars['String']>;
  /** The payment method logo url (standard) */
  standard?: Maybe<Scalars['String']>;
};

/** Contains the results of the request to assign a compare list. */
export type AssignCompareListToCustomerOutput = {
  __typename?: 'AssignCompareListToCustomerOutput';
  /** The contents of the customer's compare list. */
  compare_list?: Maybe<CompareList>;
  /** Indicates whether the compare list was successfully assigned to the customer. */
  result: Scalars['Boolean'];
};

/** Contains details about the attribute, including the code and type. */
export type Attribute = {
  __typename?: 'Attribute';
  /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
  attribute_code?: Maybe<Scalars['String']>;
  /** Attribute options list. */
  attribute_options?: Maybe<Array<Maybe<AttributeOption>>>;
  /** The data type of the attribute. */
  attribute_type?: Maybe<Scalars['String']>;
  /** The type of entity that defines the attribute. */
  entity_type?: Maybe<Scalars['String']>;
  /** The frontend input type of the attribute. */
  input_type?: Maybe<Scalars['String']>;
  /** Details about the storefront properties configured for the attribute. */
  storefront_properties?: Maybe<StorefrontProperties>;
};

/** Defines the attribute characteristics to search for the `attribute_code` and `entity_type` to search. */
export type AttributeInput = {
  /** The unique identifier for an attribute code. This value should be in lowercase letters without spaces. */
  attribute_code?: Maybe<Scalars['String']>;
  /** The type of entity that defines the attribute. */
  entity_type?: Maybe<Scalars['String']>;
};

/** Defines an attribute option. */
export type AttributeOption = {
  __typename?: 'AttributeOption';
  /** The label assigned to the attribute option. */
  label?: Maybe<Scalars['String']>;
  /** The attribute option value. */
  value?: Maybe<Scalars['String']>;
};

/** Describes a payment method that the shopper can use to pay for the order. */
export type AvailablePaymentMethod = {
  __typename?: 'AvailablePaymentMethod';
  /** The payment method code. */
  code: Scalars['String'];
  /** The payment method title. */
  title: Scalars['String'];
};

/** Contains details about the possible shipping methods and carriers. */
export type AvailableShippingMethod = {
  __typename?: 'AvailableShippingMethod';
  /** The cost of shipping using this shipping method. */
  amount: Money;
  /** Indicates whether this shipping method can be applied to the cart. */
  available: Scalars['Boolean'];
  /** @deprecated The field should not be used on the storefront. */
  base_amount?: Maybe<Money>;
  /** A string that identifies a commercial carrier or an offline shipping method. */
  carrier_code: Scalars['String'];
  /** The label for the carrier code. */
  carrier_title: Scalars['String'];
  /** Describes an error condition. */
  error_message?: Maybe<Scalars['String']>;
  /** A shipping method code associated with a carrier. The value could be null if no method is available. */
  method_code?: Maybe<Scalars['String']>;
  /** The label for the shipping method code. The value could be null if no method is available. */
  method_title?: Maybe<Scalars['String']>;
  /** The cost of shipping using this shipping method, excluding tax. */
  price_excl_tax: Money;
  /** The cost of shipping using this shipping method, including tax. */
  price_incl_tax: Money;
};

export type BannerConfig = {
  __typename?: 'BannerConfig';
  alt_text?: Maybe<Scalars['String']>;
  banner_type?: Maybe<Scalars['String']>;
  button_text?: Maybe<Scalars['String']>;
  custom?: Maybe<Scalars['String']>;
  custom_content?: Maybe<Scalars['String']>;
  custom_css?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  ga_promo_creative?: Maybe<Scalars['String']>;
  ga_promo_id?: Maybe<Scalars['String']>;
  ga_promo_name?: Maybe<Scalars['String']>;
  ga_promo_position?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<ImageDetail>;
  mobile_image?: Maybe<ImageDetail>;
  show_description?: Maybe<Scalars['String']>;
  show_title?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
  thumb_image?: Maybe<ImageDetail>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  valid_from?: Maybe<Scalars['String']>;
  valid_to?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
  wrap_link?: Maybe<Scalars['String']>;
};

export enum BatchMutationStatus {
  Success = 'SUCCESS',
  Failure = 'FAILURE',
  MixedResults = 'MIXED_RESULTS'
}

export type BedData = {
  __typename?: 'BedData';
  bed_category_product_image?: Maybe<Array<Maybe<BedProductImage>>>;
  bed_product_image?: Maybe<Array<Maybe<BedProductImage>>>;
  bed_product_image_360?: Maybe<Array<Maybe<BedProductImage>>>;
  finance_price?: Maybe<Scalars['String']>;
  gtm_tag_click?: Maybe<Scalars['String']>;
  rich_snippets?: Maybe<Scalars['String']>;
  trustpilot_product_reviews_summary?: Maybe<TrustpilotProductReviewsSummary>;
};

export type BedProductImage = {
  __typename?: 'BedProductImage';
  isMain?: Maybe<Scalars['Boolean']>;
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']>;
  /** The URL Mobile of the product image or video. */
  url_mobile?: Maybe<Scalars['String']>;
  /** The URL Mobile of the product image or video. */
  url_thumbnail?: Maybe<Scalars['String']>;
  videoUrl?: Maybe<Scalars['String']>;
};

/** Defines the billing address. */
export type BillingAddressInput = {
  /** Defines a billing address. */
  address?: Maybe<CartAddressInput>;
  /** An ID from the customer's address book that uniquely identifies the address to be used for billing. */
  customer_address_id?: Maybe<Scalars['Int']>;
  /** Indicates whether to set the billing address to be the same as the existing shipping address on the cart. */
  same_as_shipping?: Maybe<Scalars['Boolean']>;
  /** Indicates whether to set the shipping address to be the same as this billing address. */
  use_for_shipping?: Maybe<Scalars['Boolean']>;
};

/** Contains details about the billing address. */
export type BillingCartAddress = CartAddressInterface & {
  __typename?: 'BillingCartAddress';
  /** The city specified for the billing or shipping address. */
  city: Scalars['String'];
  /** The company specified for the billing or shipping address. */
  company?: Maybe<Scalars['String']>;
  /** An object containing the country label and code. */
  country: CartAddressCountry;
  /** @deprecated The field is used only in shipping address. */
  customer_notes?: Maybe<Scalars['String']>;
  /** The first name of the customer or guest. */
  firstname: Scalars['String'];
  /** The last name of the customer or guest. */
  lastname: Scalars['String'];
  /** The ZIP or postal code of the billing or shipping address. */
  postcode?: Maybe<Scalars['String']>;
  /** An object containing the region label and code. */
  region?: Maybe<CartAddressRegion>;
  /** An array containing the street for the billing or shipping address. */
  street: Array<Maybe<Scalars['String']>>;
  /** The telephone number for the billing or shipping address. */
  telephone?: Maybe<Scalars['String']>;
};

/** Brand info */
export type Brand = {
  __typename?: 'Brand';
  /** Brand image alt. */
  alt?: Maybe<Scalars['String']>;
  /** Brand Id. */
  brandId?: Maybe<Scalars['Int']>;
  /** Brand product count. */
  cnt?: Maybe<Scalars['Int']>;
  /** Brand description. */
  description?: Maybe<Scalars['String']>;
  /** Brand image. */
  image?: Maybe<Scalars['String']>;
  /** Brand image. */
  img?: Maybe<Scalars['String']>;
  /** Brand label. */
  label?: Maybe<Scalars['String']>;
  /** Brand list letter. */
  letter?: Maybe<Scalars['String']>;
  /** Brand short description. */
  short_description?: Maybe<Scalars['String']>;
  /** Brand url. */
  url?: Maybe<Scalars['String']>;
};

/** Brand info */
export type BrandForSlider = {
  __typename?: 'BrandForSlider';
  /** Brand image alt. */
  alt?: Maybe<Scalars['String']>;
  /** Brand Id. */
  brandId?: Maybe<Scalars['Int']>;
  /** Brand image. */
  img?: Maybe<Scalars['String']>;
  /** Brand label. */
  label?: Maybe<Scalars['String']>;
  /** Brand position. */
  position?: Maybe<Scalars['String']>;
  /** Brand url. */
  url?: Maybe<Scalars['String']>;
};

export type BrandList = {
  __typename?: 'BrandList';
  /** All letters. */
  all_letters?: Maybe<Scalars['String']>;
  /** Brand attribute. */
  brand_attribute?: Maybe<Attribute>;
  /** Display zero. */
  display_zero?: Maybe<Scalars['Boolean']>;
  /** Filter display all. */
  filter_display_all?: Maybe<Scalars['Boolean']>;
  /** Brand image height. */
  image_height?: Maybe<Scalars['Float']>;
  /** Brand image width. */
  image_width?: Maybe<Scalars['Float']>;
  /** Brands. */
  items?: Maybe<Array<Maybe<Brand>>>;
  /** Show count. */
  show_count?: Maybe<Scalars['Boolean']>;
  /** Show filter. */
  show_filter?: Maybe<Scalars['Boolean']>;
  /** Show images. */
  show_images?: Maybe<Scalars['Boolean']>;
  /** Show search. */
  show_search?: Maybe<Scalars['Boolean']>;
};

export type BrandSlider = {
  __typename?: 'BrandSlider';
  /** Autoplay. */
  autoplay?: Maybe<Scalars['Boolean']>;
  /** Autoplay delay. */
  autoplay_delay?: Maybe<Scalars['Int']>;
  /** Show buttons. */
  buttons_show?: Maybe<Scalars['Boolean']>;
  /** Image height. */
  image_height?: Maybe<Scalars['Float']>;
  /** Image width. */
  image_width?: Maybe<Scalars['Float']>;
  /** Infinity loop. */
  infinity_loop?: Maybe<Scalars['Boolean']>;
  /** Brands. */
  items?: Maybe<Array<Maybe<BrandForSlider>>>;
  /** Brands number. */
  items_number?: Maybe<Scalars['Int']>;
  /** Clickable pagination. */
  pagination_clickable?: Maybe<Scalars['Boolean']>;
  /** Show pagination. */
  pagination_show?: Maybe<Scalars['Boolean']>;
  /** Show label. */
  show_label?: Maybe<Scalars['Boolean']>;
  /** Simulate touch. */
  simulate_touch?: Maybe<Scalars['Boolean']>;
  /** Slider header color. */
  slider_header_color?: Maybe<Scalars['String']>;
  /** Slider title. */
  slider_title?: Maybe<Scalars['String']>;
  /** Slider title color. */
  slider_title_color?: Maybe<Scalars['String']>;
  /** Slider width. */
  slider_width?: Maybe<Scalars['Float']>;
};

/** Contains details about an individual category that comprises a breadcrumb. */
export type Breadcrumb = {
  __typename?: 'Breadcrumb';
  /**
   * The ID of the category.
   * @deprecated Use `category_uid` instead.
   */
  category_id?: Maybe<Scalars['Int']>;
  /** The category level. */
  category_level?: Maybe<Scalars['Int']>;
  /** The display name of the category. */
  category_name?: Maybe<Scalars['String']>;
  /** The unique ID for a `Breadcrumb` object. */
  category_uid: Scalars['ID'];
  /** The URL key of the category. */
  category_url_key?: Maybe<Scalars['String']>;
  /** The URL path of the category. */
  category_url_path?: Maybe<Scalars['String']>;
};

export type BreakpointConfig = {
  __typename?: 'BreakpointConfig';
  breakpoint_1?: Maybe<Scalars['String']>;
  breakpoint_2?: Maybe<Scalars['String']>;
  breakpoint_3?: Maybe<Scalars['String']>;
  breakpoint_4?: Maybe<Scalars['String']>;
};

/** An implementation for bundle product cart items. */
export type BundleCartItem = CartItemInterface & {
  __typename?: 'BundleCartItem';
  /** An array containing the bundle options the shopper selected. */
  bundle_options: Array<Maybe<SelectedBundleOption>>;
  /** An array containing the customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  date_picker?: Maybe<Scalars['String']>;
  delivery_warning?: Maybe<Scalars['String']>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** The entered gift message for the cart item */
  gift_message?: Maybe<GiftMessage>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String'];
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID'];
};

/** Defines bundle product options for `CreditMemoItemInterface`. */
export type BundleCreditMemoItem = CreditMemoItemInterface & {
  __typename?: 'BundleCreditMemoItem';
  /** A list of bundle options that are assigned to a bundle product that is part of a credit memo. */
  bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
  /** Details about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for a `CreditMemoItemInterface` object. */
  id: Scalars['ID'];
  /** The order item the credit memo is applied to. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']>;
};

/** Defines bundle product options for `InvoiceItemInterface`. */
export type BundleInvoiceItem = InvoiceItemInterface & {
  __typename?: 'BundleInvoiceItem';
  /** A list of bundle options that are assigned to an invoiced bundle product. */
  bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
  /** Information about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for an `InvoiceItemInterface` object. */
  id: Scalars['ID'];
  /** Details about an individual order item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']>;
};

/** Defines an individual item within a bundle product. */
export type BundleItem = {
  __typename?: 'BundleItem';
  /**
   * An ID assigned to each type of item in a bundle product.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** An array of additional options for this bundle item. */
  options?: Maybe<Array<Maybe<BundleItemOption>>>;
  /** A number indicating the sequence order of this item compared to the other bundle items. */
  position?: Maybe<Scalars['Int']>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** Indicates whether the item must be included in the bundle. */
  required?: Maybe<Scalars['Boolean']>;
  /** The SKU of the bundle product. */
  sku?: Maybe<Scalars['String']>;
  /** The display name of the item. */
  title?: Maybe<Scalars['String']>;
  /** The input type that the customer uses to select the item. Examples include radio button and checkbox. */
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `BundleItem` object. */
  uid?: Maybe<Scalars['ID']>;
};

/** Defines the characteristics that comprise a specific bundle item and its options. */
export type BundleItemOption = {
  __typename?: 'BundleItemOption';
  /** Indicates whether the customer can change the number of items for this option. */
  can_change_quantity?: Maybe<Scalars['Boolean']>;
  /**
   * The ID assigned to the bundled item option.
   * @deprecated Use `uid` instead
   */
  id?: Maybe<Scalars['Int']>;
  /** Indicates whether this option is the default option. */
  is_default?: Maybe<Scalars['Boolean']>;
  /** The text that identifies the bundled item option. */
  label?: Maybe<Scalars['String']>;
  /** When a bundle item contains multiple options, the relative position of this option compared to the other options. */
  position?: Maybe<Scalars['Int']>;
  /** The price of the selected option. */
  price?: Maybe<Scalars['Float']>;
  /** One of FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** Contains details about this product option. */
  product?: Maybe<ProductInterface>;
  /**
   * Indicates the quantity of this specific bundle item.
   * @deprecated Use `quantity` instead.
   */
  qty?: Maybe<Scalars['Float']>;
  /** The quantity of this specific bundle item. */
  quantity?: Maybe<Scalars['Float']>;
  /** The unique ID for a `BundleItemOption` object. */
  uid: Scalars['ID'];
};

/** Defines the input for a bundle option. */
export type BundleOptionInput = {
  /** The ID of the option. */
  id: Scalars['Int'];
  /** The number of the selected item to add to the cart. */
  quantity: Scalars['Float'];
  /** An array with the chosen value of the option. */
  value: Array<Maybe<Scalars['String']>>;
};

/** Defines bundle product options for `OrderItemInterface`. */
export type BundleOrderItem = OrderItemInterface & {
  __typename?: 'BundleOrderItem';
  additional_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** A list of bundle options that are assigned to the bundle product. */
  bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
  /** The final discount information for the product. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The entered option for the base product, such as a logo or image. */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The unique ID for an `OrderItemInterface` object. */
  id: Scalars['ID'];
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price of the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']>;
  /** URL key of the base product. */
  product_url_key?: Maybe<Scalars['String']>;
  /** The number of canceled items. */
  quantity_canceled?: Maybe<Scalars['Float']>;
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']>;
  /** The number of units ordered for this item. */
  quantity_ordered?: Maybe<Scalars['Float']>;
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']>;
  /** The number of returned items. */
  quantity_returned?: Maybe<Scalars['Float']>;
  /** The number of shipped items. */
  quantity_shipped?: Maybe<Scalars['Float']>;
  /** The selected options for the base product, such as color or size. */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item. */
  status?: Maybe<Scalars['String']>;
};

/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProduct = ProductInterface & RoutableInterface & PhysicalProductInterface & CustomizableProductInterface & {
  __typename?: 'BundleProduct';
  /** Add to cart url. */
  add_to_cart_url?: Maybe<Scalars['String']>;
  /** Add to wishlist information. */
  add_to_wishlist?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  additional_features?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  assembly_type?: Maybe<Scalars['Int']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_colours?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_sizes?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  back_stock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  backstock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  barcode?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  base_slat_type?: Maybe<Scalars['Int']>;
  /** Custom data in bedkingdom website */
  bed_data?: Maybe<BedData>;
  /** @deprecated Use the `custom_attributes` field instead. */
  benifts?: Maybe<Scalars['String']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  chair_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  colour?: Maybe<Scalars['String']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  delivery?: Maybe<Scalars['Int']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dimentions?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dining_chairs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_drawers?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_fabric?: Maybe<Scalars['Int']>;
  /** Indicates whether the bundle product has a dynamic price. */
  dynamic_price?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the bundle product has a dynamic SKU. */
  dynamic_sku?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the bundle product has a dynamically calculated weight. */
  dynamic_weight?: Maybe<Scalars['Boolean']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  exchange_return_upgrade?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  feet_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  filling_type_search?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  fold_mechanism?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  free_delivery?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  furniture_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ggiftcard_amount_config?: Maybe<Scalars['String']>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gtin?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  guarantee?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  headboard_included?: Maybe<Scalars['Int']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** An array containing information about individual bundle items. */
  items?: Maybe<Array<Maybe<BundleItem>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ladder?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  leg_diameter?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  length?: Maybe<Scalars['String']>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  matching_headboard?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  material_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_bundle?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_depth?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_tention?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_turn?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_type?: Maybe<Scalars['Int']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mpn?: Maybe<Scalars['String']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  nocupboards?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  number_of_springs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  numberdrawers?: Maybe<Scalars['Int']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  optional_extras?: Maybe<Scalars['Int']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** One of PRICE_RANGE or AS_LOW_AS. */
  price_view?: Maybe<PriceViewEnum>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Product url. */
  product_url?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ranges?: Maybe<Scalars['Int']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  room_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  seat_type?: Maybe<Scalars['Int']>;
  /** Indicates whether to ship bundle items together or individually. */
  ship_bundle_items?: Maybe<ShipBundleItemsEnum>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  size?: Maybe<Scalars['Int']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  split?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type_search?: Maybe<Scalars['Int']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  stompa_colours?: Maybe<Scalars['Int']>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_top_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  temperature_control_fabric?: Maybe<Scalars['Int']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  top_bunk_size?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_options?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_size?: Maybe<Scalars['Int']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  udropship_vendor?: Maybe<Scalars['Int']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  wardrobe_doors?: Maybe<Scalars['Int']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']>;
};


/** Defines basic features of a bundle product and contains multiple BundleItems. */
export type BundleProductReviewsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

/** Defines a single bundle product. */
export type BundleProductCartItemInput = {
  /** A mandatory array of options for the bundle product, including each chosen option and specified quantity. */
  bundle_options: Array<Maybe<BundleOptionInput>>;
  /** The ID and value of the option. */
  customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>;
  /** The quantity and SKU of the bundle product. */
  data: CartItemInput;
};

/** Defines bundle product options for `ShipmentItemInterface`. */
export type BundleShipmentItem = ShipmentItemInterface & {
  __typename?: 'BundleShipmentItem';
  /** A list of bundle options that are assigned to a shipped product. */
  bundle_options?: Maybe<Array<Maybe<ItemSelectedBundleOption>>>;
  /** The unique ID for a `ShipmentItemInterface` object. */
  id: Scalars['ID'];
  /** The order item associated with the shipment item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of shipped items. */
  quantity_shipped: Scalars['Float'];
};

/** Defines bundle product options for `WishlistItemInterface`. */
export type BundleWishlistItem = WishlistItemInterface & {
  __typename?: 'BundleWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String'];
  /** An array containing information about the selected bundle items. */
  bundle_options?: Maybe<Array<Maybe<SelectedBundleOption>>>;
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float'];
};

/** Contains the contents and other details about a guest or customer cart. */
export type Cart = {
  __typename?: 'Cart';
  /** Contains the code attribute, which specifies the applied gift card codes */
  applied_am_gift_cards?: Maybe<Array<Maybe<AppliedAmGiftCard>>>;
  /** @deprecated Use `applied_coupons` instead. */
  applied_coupon?: Maybe<AppliedCoupon>;
  /** An array of `AppliedCoupon` objects. Each object contains the `code` text attribute, which specifies the coupon code. */
  applied_coupons?: Maybe<Array<Maybe<AppliedCoupon>>>;
  /** An array of available payment methods. */
  available_payment_methods?: Maybe<Array<Maybe<AvailablePaymentMethod>>>;
  /** The billing address assigned to the cart. */
  billing_address?: Maybe<BillingCartAddress>;
  /** The email address of the guest or customer. */
  email?: Maybe<Scalars['String']>;
  /** The entered gift message for the cart */
  gift_message?: Maybe<GiftMessage>;
  /** The unique ID for a `Cart` object. */
  id: Scalars['ID'];
  /** Indicates whether the cart contains only virtual products. */
  is_virtual: Scalars['Boolean'];
  /** An array of products that have been added to the cart. */
  items?: Maybe<Array<Maybe<CartItemInterface>>>;
  /** Pricing details for the quote. */
  prices?: Maybe<CartPrices>;
  /** Indicates which payment method was applied to the cart. */
  selected_payment_method?: Maybe<SelectedPaymentMethod>;
  /** An array of shipping addresses assigned to the cart. */
  shipping_addresses: Array<Maybe<ShippingCartAddress>>;
  /** The total number of items in the cart. */
  total_quantity: Scalars['Float'];
};

/** Contains details the country in a billing or shipping address. */
export type CartAddressCountry = {
  __typename?: 'CartAddressCountry';
  /** The country code. */
  code: Scalars['String'];
  /** The display label for the country. */
  label: Scalars['String'];
};

/** Defines the billing or shipping address to be applied to the cart. */
export type CartAddressInput = {
  /** The city specified for the billing or shipping address. */
  city: Scalars['String'];
  /** The company specified for the billing or shipping address. */
  company?: Maybe<Scalars['String']>;
  /** The country code and label for the billing or shipping address. */
  country_code: Scalars['String'];
  /** The first name of the customer or guest. */
  firstname: Scalars['String'];
  iz_address_district?: Maybe<Scalars['String']>;
  iz_address_province?: Maybe<Scalars['String']>;
  iz_address_ward?: Maybe<Scalars['String']>;
  /** The last name of the customer or guest. */
  lastname: Scalars['String'];
  /** The ZIP or postal code of the billing or shipping address. */
  postcode?: Maybe<Scalars['String']>;
  /** A string that defines the state or province of the billing or shipping address. */
  region?: Maybe<Scalars['String']>;
  /** An integer that defines the state or province of the billing or shipping address. */
  region_id?: Maybe<Scalars['Int']>;
  /** Determines whether to save the address in the customer's address book. The default value is true. */
  save_in_address_book?: Maybe<Scalars['Boolean']>;
  /** An array containing the street for the billing or shipping address. */
  street: Array<Maybe<Scalars['String']>>;
  /** The telephone number for the billing or shipping address. */
  telephone?: Maybe<Scalars['String']>;
};

export type CartAddressInterface = {
  /** The city specified for the billing or shipping address. */
  city: Scalars['String'];
  /** The company specified for the billing or shipping address. */
  company?: Maybe<Scalars['String']>;
  /** An object containing the country label and code. */
  country: CartAddressCountry;
  /** The first name of the customer or guest. */
  firstname: Scalars['String'];
  /** The last name of the customer or guest. */
  lastname: Scalars['String'];
  /** The ZIP or postal code of the billing or shipping address. */
  postcode?: Maybe<Scalars['String']>;
  /** An object containing the region label and code. */
  region?: Maybe<CartAddressRegion>;
  /** An array containing the street for the billing or shipping address. */
  street: Array<Maybe<Scalars['String']>>;
  /** The telephone number for the billing or shipping address. */
  telephone?: Maybe<Scalars['String']>;
};

/** Contains details about the region in a billing or shipping address. */
export type CartAddressRegion = {
  __typename?: 'CartAddressRegion';
  /** The state or province code. */
  code?: Maybe<Scalars['String']>;
  /** The display label for the region. */
  label?: Maybe<Scalars['String']>;
  /** The unique ID for a pre-defined region. */
  region_id?: Maybe<Scalars['Int']>;
};

/** Contains information about discounts applied to the cart. */
export type CartDiscount = {
  __typename?: 'CartDiscount';
  /** The amount of the discount applied to the item. */
  amount: Money;
  /** The description of the discount. */
  label: Array<Maybe<Scalars['String']>>;
};

export type CartItemError = {
  __typename?: 'CartItemError';
  /** An error code that describes the error encountered */
  code: CartItemErrorType;
  /** A localized error message */
  message: Scalars['String'];
};

export enum CartItemErrorType {
  Undefined = 'UNDEFINED',
  ItemQty = 'ITEM_QTY',
  ItemIncrements = 'ITEM_INCREMENTS'
}

/** Defines an item to be added to the cart. */
export type CartItemInput = {
  date_picker?: Maybe<Scalars['String']>;
  /** An array of entered options for the base product, such as personalization text. */
  entered_options?: Maybe<Array<Maybe<EnteredOptionInput>>>;
  /** For a child product, the SKU of its parent product. */
  parent_sku?: Maybe<Scalars['String']>;
  /** The amount or number of an item to add. */
  quantity: Scalars['Float'];
  /** The selected options for the base product, such as color or size, using the unique ID for an object such as `CustomizableRadioOption`, `CustomizableDropDownOption`, or `ConfigurableProductOptionsValues`. */
  selected_options?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** The SKU of the product. */
  sku: Scalars['String'];
};

/** An interface for products in a cart. */
export type CartItemInterface = {
  date_picker?: Maybe<Scalars['String']>;
  delivery_warning?: Maybe<Scalars['String']>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String'];
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID'];
};

/** Contains details about the price of the item, including taxes and discounts. */
export type CartItemPrices = {
  __typename?: 'CartItemPrices';
  /** An array of discounts to be applied to the cart item. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** An array of FPTs applied to the cart item. */
  fixed_product_taxes?: Maybe<Array<Maybe<FixedProductTax>>>;
  /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
  price: Money;
  /** The price of the item before any discounts were applied. The price that might include tax, depending on the configured display settings for cart. */
  price_including_tax: Money;
  /** The value of the price multiplied by the quantity of the item. */
  row_total: Money;
  /** The value of `row_total` plus the tax applied to the item. */
  row_total_including_tax: Money;
  /** The total of all discounts applied to the item. */
  total_item_discount?: Maybe<Money>;
};

/** Deprecated: The `ShippingCartAddress.cart_items` field now returns `CartItemInterface`. */
export type CartItemQuantity = {
  __typename?: 'CartItemQuantity';
  /** @deprecated The `ShippingCartAddress.cart_items` field now returns `CartItemInterface`. */
  cart_item_id: Scalars['Int'];
  /** @deprecated The `ShippingCartAddress.cart_items` field now returns `CartItemInterface`. */
  quantity: Scalars['Float'];
};

/** Contains details about the price of a selected customizable value. */
export type CartItemSelectedOptionValuePrice = {
  __typename?: 'CartItemSelectedOptionValuePrice';
  /** Indicates whether the price type is fixed, percent, or dynamic. */
  type: PriceTypeEnum;
  /** A string that describes the unit of the value. */
  units: Scalars['String'];
  /** A price value. */
  value: Scalars['Float'];
};

/** A single item to be updated. */
export type CartItemUpdateInput = {
  /** Deprecated. Use `cart_item_uid` instead. */
  cart_item_id?: Maybe<Scalars['Int']>;
  /** The unique ID for a `CartItemInterface` object. */
  cart_item_uid?: Maybe<Scalars['ID']>;
  /** An array that defines customizable options for the product. */
  customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>;
  /** Gift message details for the cart item */
  gift_message?: Maybe<GiftMessageInput>;
  /** The new quantity of the item. */
  quantity?: Maybe<Scalars['Float']>;
};

/** Contains details about the final price of items in the cart, including discount and tax information. */
export type CartPrices = {
  __typename?: 'CartPrices';
  /** An array containing the names and amounts of taxes applied to each item in the cart. */
  applied_taxes?: Maybe<Array<Maybe<CartTaxItem>>>;
  /** @deprecated Use discounts instead. */
  discount?: Maybe<CartDiscount>;
  /** An array containing all discounts applied to the cart. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The total, including discounts, taxes, shipping, and other fees. */
  grand_total?: Maybe<Money>;
  /** The subtotal without any applied taxes. */
  subtotal_excluding_tax?: Maybe<Money>;
  /** The subtotal including any applied taxes. */
  subtotal_including_tax?: Maybe<Money>;
  /** The subtotal with any discounts applied, but not taxes. */
  subtotal_with_discount_excluding_tax?: Maybe<Money>;
};

/** Contains tax information about an item in the cart. */
export type CartTaxItem = {
  __typename?: 'CartTaxItem';
  /** The amount of tax applied to the item. */
  amount: Money;
  /** The description of the tax. */
  label: Scalars['String'];
};

/** An error encountered while adding an item to the the cart. */
export type CartUserInputError = {
  __typename?: 'CartUserInputError';
  /** A cart-specific error code. */
  code: CartUserInputErrorType;
  /** A localized error message. */
  message: Scalars['String'];
};

export enum CartUserInputErrorType {
  ProductNotFound = 'PRODUCT_NOT_FOUND',
  NotSalable = 'NOT_SALABLE',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  Undefined = 'UNDEFINED'
}

export type Categories = {
  __typename?: 'Categories';
  /** The payment method assets */
  asset_urls?: Maybe<Array<Maybe<Assets>>>;
  /** The payment method identifier */
  identifier: Scalars['String'];
  /** The payment method name */
  name: Scalars['String'];
};

/** Defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type CategoryFilterInput = {
  /** Filter by the unique category ID for a `CategoryInterface` object. */
  category_uid?: Maybe<FilterEqualTypeInput>;
  /** Deprecated: use 'category_uid' to filter uniquely identifiers of categories. */
  ids?: Maybe<FilterEqualTypeInput>;
  /** Filter by the display name of the category. */
  name?: Maybe<FilterMatchTypeInput>;
  /** Filter by the unique parent category ID for a `CategoryInterface` object. */
  parent_category_uid?: Maybe<FilterEqualTypeInput>;
  /** Filter by the unique parent category ID for a `CategoryInterface` object. */
  parent_id?: Maybe<FilterEqualTypeInput>;
  /** Filter by the part of the URL that identifies the category. */
  url_key?: Maybe<FilterEqualTypeInput>;
  /** Filter by the URL path for the category. */
  url_path?: Maybe<FilterEqualTypeInput>;
};

/** Contains the full set of attributes that can be returned in a category search. */
export type CategoryInterface = {
  am_exclude_from_filter?: Maybe<Scalars['Int']>;
  amasty_category_product_sort?: Maybe<Scalars['Int']>;
  amasty_dynamic_conditions?: Maybe<Scalars['String']>;
  amlanding_is_dynamic?: Maybe<Scalars['Int']>;
  amlanding_page_id?: Maybe<Scalars['Int']>;
  amp_display_mode?: Maybe<Scalars['String']>;
  amp_homepage_image?: Maybe<Scalars['String']>;
  available_sort_by?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** An array of breadcrumb items. */
  breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  category_description_tpl?: Maybe<Scalars['String']>;
  category_meta_description_tpl?: Maybe<Scalars['String']>;
  category_meta_keywords_tpl?: Maybe<Scalars['String']>;
  category_meta_title_tpl?: Maybe<Scalars['String']>;
  category_title_tpl?: Maybe<Scalars['String']>;
  children_count?: Maybe<Scalars['String']>;
  /** Contains a category CMS block. */
  cms_block?: Maybe<CmsBlock>;
  /**
   * The timestamp indicating when the category was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  custom_layout_update_file?: Maybe<Scalars['String']>;
  /** The attribute to use for sorting. */
  default_sort_by?: Maybe<Scalars['String']>;
  /** An optional description of the category. */
  description?: Maybe<Scalars['String']>;
  display_mode?: Maybe<Scalars['String']>;
  exclude_from_sitemap?: Maybe<Scalars['Int']>;
  filter_description_tpl?: Maybe<Scalars['String']>;
  filter_meta_description_tpl?: Maybe<Scalars['String']>;
  filter_meta_keywords_tpl?: Maybe<Scalars['String']>;
  filter_meta_title_tpl?: Maybe<Scalars['String']>;
  filter_price_range?: Maybe<Scalars['Int']>;
  filter_title_tpl?: Maybe<Scalars['String']>;
  googlecategory?: Maybe<Scalars['String']>;
  /**
   * An ID that uniquely identifies the category.
   * @deprecated Use `uid` instead.
   */
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  include_in_menu?: Maybe<Scalars['Int']>;
  is_anchor?: Maybe<Scalars['Int']>;
  landing_page?: Maybe<Scalars['Int']>;
  /** The depth of the category within the tree. */
  level?: Maybe<Scalars['Int']>;
  meta_description?: Maybe<Scalars['String']>;
  meta_keywords?: Maybe<Scalars['String']>;
  meta_title?: Maybe<Scalars['String']>;
  /** The display name of the category. */
  name?: Maybe<Scalars['String']>;
  /** The full category path. */
  path?: Maybe<Scalars['String']>;
  /** The category path within the store. */
  path_in_store?: Maybe<Scalars['String']>;
  /** The position of the category relative to other categories at the same level in tree. */
  position?: Maybe<Scalars['Int']>;
  /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  product_count?: Maybe<Scalars['Int']>;
  product_description_tpl?: Maybe<Scalars['String']>;
  product_full_description_tpl?: Maybe<Scalars['String']>;
  product_meta_description_tpl?: Maybe<Scalars['String']>;
  product_meta_keywords_tpl?: Maybe<Scalars['String']>;
  product_meta_title_tpl?: Maybe<Scalars['String']>;
  product_short_description_tpl?: Maybe<Scalars['String']>;
  product_title_tpl?: Maybe<Scalars['String']>;
  /** The list of products assigned to the category. */
  products?: Maybe<CategoryProducts>;
  seo_page_header?: Maybe<Scalars['String']>;
  short_description?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  title_h1?: Maybe<Scalars['String']>;
  /** The unique ID for a `CategoryInterface` object. */
  uid: Scalars['ID'];
  /**
   * The timestamp indicating when the category was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** The URL key assigned to the category. */
  url_key?: Maybe<Scalars['String']>;
  /** The URL path assigned to the category. */
  url_path?: Maybe<Scalars['String']>;
  /** The part of the category URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
};


/** Contains the full set of attributes that can be returned in a category search. */
export type CategoryInterfaceProductsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductAttributeSortInput>;
};

/** Contains details about the products assigned to a category. */
export type CategoryProducts = {
  __typename?: 'CategoryProducts';
  /** An array of products that are assigned to the category. */
  items?: Maybe<Array<Maybe<ProductInterface>>>;
  /** Pagination metadata. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  total_count?: Maybe<Scalars['Int']>;
};

/** Contains a collection of `CategoryTree` objects and pagination information. */
export type CategoryResult = {
  __typename?: 'CategoryResult';
  /** A list of categories that match the filter criteria. */
  items?: Maybe<Array<Maybe<CategoryTree>>>;
  /** An object that includes the `page_info` and `currentPage` values specified in the query. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The total number of categories that match the criteria. */
  total_count?: Maybe<Scalars['Int']>;
};

/** Contains the hierarchy of categories. */
export type CategoryTree = CategoryInterface & RoutableInterface & {
  __typename?: 'CategoryTree';
  am_exclude_from_filter?: Maybe<Scalars['Int']>;
  amasty_category_product_sort?: Maybe<Scalars['Int']>;
  amasty_dynamic_conditions?: Maybe<Scalars['String']>;
  amlanding_is_dynamic?: Maybe<Scalars['Int']>;
  amlanding_page_id?: Maybe<Scalars['Int']>;
  amp_display_mode?: Maybe<Scalars['String']>;
  amp_homepage_image?: Maybe<Scalars['String']>;
  available_sort_by?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** An array of breadcrumb items. */
  breadcrumbs?: Maybe<Array<Maybe<Breadcrumb>>>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  category_description_tpl?: Maybe<Scalars['String']>;
  category_meta_description_tpl?: Maybe<Scalars['String']>;
  category_meta_keywords_tpl?: Maybe<Scalars['String']>;
  category_meta_title_tpl?: Maybe<Scalars['String']>;
  category_title_tpl?: Maybe<Scalars['String']>;
  /** A tree of child categories. */
  children?: Maybe<Array<Maybe<CategoryTree>>>;
  children_count?: Maybe<Scalars['String']>;
  /** Contains a category CMS block. */
  cms_block?: Maybe<CmsBlock>;
  /**
   * The timestamp indicating when the category was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  custom_layout_update_file?: Maybe<Scalars['String']>;
  /** The attribute to use for sorting. */
  default_sort_by?: Maybe<Scalars['String']>;
  /** An optional description of the category. */
  description?: Maybe<Scalars['String']>;
  display_mode?: Maybe<Scalars['String']>;
  exclude_from_sitemap?: Maybe<Scalars['Int']>;
  filter_description_tpl?: Maybe<Scalars['String']>;
  filter_meta_description_tpl?: Maybe<Scalars['String']>;
  filter_meta_keywords_tpl?: Maybe<Scalars['String']>;
  filter_meta_title_tpl?: Maybe<Scalars['String']>;
  filter_price_range?: Maybe<Scalars['Int']>;
  filter_title_tpl?: Maybe<Scalars['String']>;
  googlecategory?: Maybe<Scalars['String']>;
  /**
   * An ID that uniquely identifies the category.
   * @deprecated Use `uid` instead.
   */
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  include_in_menu?: Maybe<Scalars['Int']>;
  is_anchor?: Maybe<Scalars['Int']>;
  landing_page?: Maybe<Scalars['Int']>;
  /** The depth of the category within the tree. */
  level?: Maybe<Scalars['Int']>;
  meta_description?: Maybe<Scalars['String']>;
  meta_keywords?: Maybe<Scalars['String']>;
  meta_title?: Maybe<Scalars['String']>;
  /** The display name of the category. */
  name?: Maybe<Scalars['String']>;
  /** The full category path. */
  path?: Maybe<Scalars['String']>;
  /** The category path within the store. */
  path_in_store?: Maybe<Scalars['String']>;
  /** The position of the category relative to other categories at the same level in tree. */
  position?: Maybe<Scalars['Int']>;
  /** The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  product_count?: Maybe<Scalars['Int']>;
  product_description_tpl?: Maybe<Scalars['String']>;
  product_full_description_tpl?: Maybe<Scalars['String']>;
  product_meta_description_tpl?: Maybe<Scalars['String']>;
  product_meta_keywords_tpl?: Maybe<Scalars['String']>;
  product_meta_title_tpl?: Maybe<Scalars['String']>;
  product_short_description_tpl?: Maybe<Scalars['String']>;
  product_title_tpl?: Maybe<Scalars['String']>;
  /** The list of products assigned to the category. */
  products?: Maybe<CategoryProducts>;
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  seo_page_header?: Maybe<Scalars['String']>;
  short_description?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  title_h1?: Maybe<Scalars['String']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /** The unique ID for a `CategoryInterface` object. */
  uid: Scalars['ID'];
  /**
   * The timestamp indicating when the category was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** The URL key assigned to the category. */
  url_key?: Maybe<Scalars['String']>;
  /** The URL path assigned to the category. */
  url_path?: Maybe<Scalars['String']>;
  /** The part of the category URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
};


/** Contains the hierarchy of categories. */
export type CategoryTreeProductsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductAttributeSortInput>;
};

/** Defines details about an individual checkout agreement. */
export type CheckoutAgreement = {
  __typename?: 'CheckoutAgreement';
  /** The ID for a checkout agreement. */
  agreement_id: Scalars['Int'];
  /** The checkbox text for the checkout agreement. */
  checkbox_text: Scalars['String'];
  /** Required. The text of the agreement. */
  content: Scalars['String'];
  /** The height of the text box where the Terms and Conditions statement appears during checkout. */
  content_height?: Maybe<Scalars['String']>;
  /** Indicates whether the `content` text is in HTML format. */
  is_html: Scalars['Boolean'];
  /** Indicates whether agreements are accepted automatically or manually. */
  mode: CheckoutAgreementMode;
  /** The name given to the condition. */
  name: Scalars['String'];
};

/** Indicates how agreements are accepted. */
export enum CheckoutAgreementMode {
  /** Conditions are automatically accepted upon checkout. */
  Auto = 'AUTO',
  /** Shoppers must manually accept the conditions to place an order. */
  Manual = 'MANUAL'
}

export type CheckoutSessionConfigOutput = {
  __typename?: 'CheckoutSessionConfigOutput';
  button_color?: Maybe<Scalars['String']>;
  checkout_payload?: Maybe<Scalars['String']>;
  checkout_signature?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  login_payload?: Maybe<Scalars['String']>;
  login_signature?: Maybe<Scalars['String']>;
  merchant_id?: Maybe<Scalars['String']>;
  pay_only?: Maybe<Scalars['Boolean']>;
  paynow_payload?: Maybe<Scalars['String']>;
  paynow_signature?: Maybe<Scalars['String']>;
  public_key_id?: Maybe<Scalars['String']>;
  sandbox?: Maybe<Scalars['Boolean']>;
};

export type CheckoutSessionDetailsOutput = {
  __typename?: 'CheckoutSessionDetailsOutput';
  response: Scalars['String'];
};

export type CheckoutSessionSignInOutput = {
  __typename?: 'CheckoutSessionSignInOutput';
  customer_bearer_token?: Maybe<Scalars['String']>;
  customer_email?: Maybe<Scalars['String']>;
  customer_firstname?: Maybe<Scalars['String']>;
  customer_id?: Maybe<Scalars['String']>;
  customer_last?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** An error encountered while adding an item to the cart. */
export type CheckoutUserInputError = {
  __typename?: 'CheckoutUserInputError';
  /** An error code that is specific to Checkout. */
  code: CheckoutUserInputErrorCodes;
  /** A localized error message. */
  message: Scalars['String'];
  /** The path to the input field that caused an error. See the GraphQL specification about path errors for details: http://spec.graphql.org/draft/#sec-Errors */
  path: Array<Maybe<Scalars['String']>>;
};

export enum CheckoutUserInputErrorCodes {
  ReorderNotAvailable = 'REORDER_NOT_AVAILABLE',
  ProductNotFound = 'PRODUCT_NOT_FOUND',
  NotSalable = 'NOT_SALABLE',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  Undefined = 'UNDEFINED'
}

/** Configuration for chiaki project */
export type ChiakiConfig = {
  __typename?: 'ChiakiConfig';
  key: Scalars['String'];
  store_id?: Maybe<Scalars['String']>;
  user_id: Scalars['String'];
  value: Scalars['String'];
};

export type ChiakiInput = {
  key?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** EntityUrl is an output object containing the `id`, `relative_url`, and `type` attributes */
export type ChiakiPage = {
  __typename?: 'ChiakiPage';
  additional_data?: Maybe<Scalars['String']>;
  config_data?: Maybe<Scalars['String']>;
  /** The ID assigned to the object associated with the specified url. This could be a product ID, category ID, or page ID. */
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['String']>;
  page_type?: Maybe<UrlRewriteEntityTypeEnum>;
  /** 301 or 302 HTTP code for url permanent or temporary redirect or 0 for the 200 no redirect */
  redirectCode?: Maybe<Scalars['Int']>;
  /** The internal relative URL. If the specified  url is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** One of PRODUCT, CATEGORY, CMS_PAGE, or CHIAKI_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
};

export type ClearpayInput = {
  /** Clearpay checkout token returned by the createClearpayCheckout mutation */
  clearpay_token: Scalars['String'];
};

/** A set of relative URLs that Clearpay will use in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. */
export type ClearpayRedirectPathInput = {
  /** The relative URL of the page that Clearpay will redirect to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/clearpay/payment/cancel, the relative URL is clearpay/payment/cancel. */
  cancel_path: Scalars['String'];
  /** The relative URL of the final confirmation page that Clearpay will redirect to upon payment success. If the full URL to this page is https://www.example.com/clearpay/payment/success, the relative URL is clearpay/payment/success. */
  confirm_path: Scalars['String'];
};

/** Contains details about a specific CMS block. */
export type CmsBlock = {
  __typename?: 'CmsBlock';
  /** The content of the CMS block in raw HTML. */
  content?: Maybe<Scalars['String']>;
  /** The CMS block identifier. */
  identifier?: Maybe<Scalars['String']>;
  /** The title assigned to the CMS block. */
  title?: Maybe<Scalars['String']>;
};

/** Contains an array CMS block items. */
export type CmsBlocks = {
  __typename?: 'CmsBlocks';
  /** An array of CMS blocks. */
  items?: Maybe<Array<Maybe<CmsBlock>>>;
};

/** Contains details about a CMS page. */
export type CmsPage = RoutableInterface & {
  __typename?: 'CmsPage';
  /** The content of the CMS page in raw HTML. */
  content?: Maybe<Scalars['String']>;
  /** The heading that displays at the top of the CMS page. */
  content_heading?: Maybe<Scalars['String']>;
  /** The ID of a CMS page. */
  identifier?: Maybe<Scalars['String']>;
  /** A brief description of the page for search results listings. */
  meta_description?: Maybe<Scalars['String']>;
  /** A brief description of the page for search results listings. */
  meta_keywords?: Maybe<Scalars['String']>;
  /** A page title that is indexed by search engines and appears in search results listings. */
  meta_title?: Maybe<Scalars['String']>;
  /** The design layout of the page, indicating the number of columns and navigation features used on the page. */
  page_layout?: Maybe<Scalars['String']>;
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** The name that appears in the breadcrumb trail navigation and in the browser title bar and tab. */
  title?: Maybe<Scalars['String']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /** The URL key of the CMS page, which is often based on the `content_heading`. */
  url_key?: Maybe<Scalars['String']>;
};

export type ColorSwatchData = SwatchDataInterface & {
  __typename?: 'ColorSwatchData';
  /** The value can be represented as color (HEX code), image link, or text. */
  value?: Maybe<Scalars['String']>;
};

/** Contains an attribute code that is used for product comparisons. */
export type ComparableAttribute = {
  __typename?: 'ComparableAttribute';
  /** An attribute code that is enabled for product comparisons. */
  code: Scalars['String'];
  /** The label of the attribute code. */
  label: Scalars['String'];
};

/** Defines an object used to iterate through items for product comparisons. */
export type ComparableItem = {
  __typename?: 'ComparableItem';
  /** An array of product attributes that can be used to compare products. */
  attributes: Array<Maybe<ProductAttribute>>;
  /** Details about a product in a compare list. */
  product: ProductInterface;
  /** The unique ID of an item in a compare list. */
  uid: Scalars['ID'];
};

/** Contains iterable information such as the array of items, the count, and attributes that represent the compare list. */
export type CompareList = {
  __typename?: 'CompareList';
  /** An array of attributes that can be used for comparing products. */
  attributes?: Maybe<Array<Maybe<ComparableAttribute>>>;
  /** The number of items in the compare list. */
  item_count: Scalars['Int'];
  /** An array of products to compare. */
  items?: Maybe<Array<Maybe<ComparableItem>>>;
  /** The unique ID assigned to the compare list. */
  uid: Scalars['ID'];
};

export type CompleteCheckoutSessionOutput = {
  __typename?: 'CompleteCheckoutSessionOutput';
  increment_id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ComplexTextValue = {
  __typename?: 'ComplexTextValue';
  /** Text that can contain HTML tags. */
  html: Scalars['String'];
};

/** Contains details about a configurable product attribute option. */
export type ConfigurableAttributeOption = {
  __typename?: 'ConfigurableAttributeOption';
  /** The ID assigned to the attribute. */
  code?: Maybe<Scalars['String']>;
  /** A string that describes the configurable attribute option. */
  label?: Maybe<Scalars['String']>;
  /** The unique ID for a `ConfigurableAttributeOption` object. */
  uid: Scalars['ID'];
  /** A unique index number assigned to the configurable product option. */
  value_index?: Maybe<Scalars['Int']>;
};

/** An implementation for configurable product cart items. */
export type ConfigurableCartItem = CartItemInterface & {
  __typename?: 'ConfigurableCartItem';
  /** An array containing the configuranle options the shopper selected. */
  configurable_options: Array<Maybe<SelectedConfigurableOption>>;
  /** Product details of the cart item. */
  configured_variant: ProductInterface;
  /** An array containing the customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  date_picker?: Maybe<Scalars['String']>;
  delivery_warning?: Maybe<Scalars['String']>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** The entered gift message for the cart item */
  gift_message?: Maybe<GiftMessage>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String'];
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID'];
};

/** Describes configurable options that have been selected and can be selected as a result of the previous selections. */
export type ConfigurableOptionAvailableForSelection = {
  __typename?: 'ConfigurableOptionAvailableForSelection';
  /** An attribute code that uniquely identifies a configurable option. */
  attribute_code: Scalars['String'];
  /** An array of selectable option value IDs. */
  option_value_uids: Array<Maybe<Scalars['ID']>>;
};

/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProduct = ProductInterface & RoutableInterface & PhysicalProductInterface & CustomizableProductInterface & {
  __typename?: 'ConfigurableProduct';
  /** Add to cart url. */
  add_to_cart_url?: Maybe<Scalars['String']>;
  /** Add to wishlist information. */
  add_to_wishlist?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  additional_features?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  assembly_type?: Maybe<Scalars['Int']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_colours?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_sizes?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  back_stock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  backstock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  barcode?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  base_slat_type?: Maybe<Scalars['Int']>;
  /** Custom data in bedkingdom website */
  bed_data?: Maybe<BedData>;
  /** @deprecated Use the `custom_attributes` field instead. */
  benifts?: Maybe<Scalars['String']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  chair_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  colour?: Maybe<Scalars['String']>;
  /** An array of options for the configurable product. */
  configurable_options?: Maybe<Array<Maybe<ConfigurableProductOptions>>>;
  /** An array of media gallery items and other details about selected configurable product options as well as details about remaining selectable options. */
  configurable_product_options_selection?: Maybe<ConfigurableProductOptionsSelection>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  delivery?: Maybe<Scalars['Int']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dimentions?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dining_chairs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_drawers?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_fabric?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  exchange_return_upgrade?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  feet_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  filling_type_search?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  fold_mechanism?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  free_delivery?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  furniture_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ggiftcard_amount_config?: Maybe<Scalars['String']>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gtin?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  guarantee?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  headboard_included?: Maybe<Scalars['Int']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ladder?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  leg_diameter?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  length?: Maybe<Scalars['String']>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  matching_headboard?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  material_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_bundle?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_depth?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_tention?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_turn?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_type?: Maybe<Scalars['Int']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mpn?: Maybe<Scalars['String']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  nocupboards?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  number_of_springs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  numberdrawers?: Maybe<Scalars['Int']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  optional_extras?: Maybe<Scalars['Int']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Product url. */
  product_url?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ranges?: Maybe<Scalars['Int']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  room_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  seat_type?: Maybe<Scalars['Int']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  size?: Maybe<Scalars['Int']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  split?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type_search?: Maybe<Scalars['Int']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  stompa_colours?: Maybe<Scalars['Int']>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_top_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  temperature_control_fabric?: Maybe<Scalars['Int']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  top_bunk_size?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_options?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_size?: Maybe<Scalars['Int']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  udropship_vendor?: Maybe<Scalars['Int']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /** An array of simple product variants. */
  variants?: Maybe<Array<Maybe<ConfigurableVariant>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  wardrobe_doors?: Maybe<Scalars['Int']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']>;
};


/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProductConfigurable_Product_Options_SelectionArgs = {
  configurableOptionValueUids?: Maybe<Array<Scalars['ID']>>;
};


/** Defines basic features of a configurable product and its simple product variants. */
export type ConfigurableProductReviewsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type ConfigurableProductCartItemInput = {
  /** The ID and value of the option. */
  customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>;
  /** The quantity and SKU of the configurable product. */
  data: CartItemInput;
  /** The SKU of the parent configurable product. */
  parent_sku?: Maybe<Scalars['String']>;
  /** Deprecated. Use `CartItemInput.sku` instead. */
  variant_sku?: Maybe<Scalars['String']>;
};

/** Contains details about configurable product options. */
export type ConfigurableProductOption = {
  __typename?: 'ConfigurableProductOption';
  /** An attribute code that uniquely identifies a configurable option. */
  attribute_code: Scalars['String'];
  /** The display name of the option. */
  label: Scalars['String'];
  /** The unique ID of the configurable option. */
  uid: Scalars['ID'];
  /** An array of values that are applicable for this option. */
  values?: Maybe<Array<Maybe<ConfigurableProductOptionValue>>>;
};

/** Defines a value for a configurable product option. */
export type ConfigurableProductOptionValue = {
  __typename?: 'ConfigurableProductOptionValue';
  /** Indicates whether the product is available with this selected option. */
  is_available: Scalars['Boolean'];
  /** Indicates whether the value is the default. */
  is_use_default: Scalars['Boolean'];
  /** The display name of the value. */
  label: Scalars['String'];
  /** The URL assigned to the thumbnail of the swatch image. */
  swatch?: Maybe<SwatchDataInterface>;
  /** The unique ID of the value. */
  uid: Scalars['ID'];
};

/** Defines configurable attributes for the specified product. */
export type ConfigurableProductOptions = {
  __typename?: 'ConfigurableProductOptions';
  /** A string that identifies the attribute. */
  attribute_code?: Maybe<Scalars['String']>;
  /**
   * The ID assigned to the attribute.
   * @deprecated Use `attribute_uid` instead.
   */
  attribute_id?: Maybe<Scalars['String']>;
  /**
   * The ID assigned to the attribute.
   * @deprecated Use `attribute_uid` instead.
   */
  attribute_id_v2?: Maybe<Scalars['Int']>;
  /** The unique ID for an `Attribute` object. */
  attribute_uid: Scalars['ID'];
  /**
   * The configurable option ID number assigned by the system.
   * @deprecated Use `uid` instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** A displayed string that describes the configurable product option. */
  label?: Maybe<Scalars['String']>;
  /** A number that indicates the order in which the attribute is displayed. */
  position?: Maybe<Scalars['Int']>;
  /**
   * This is the same as a product's `id` field.
   * @deprecated `product_id` is not needed and can be obtained from its parent.
   */
  product_id?: Maybe<Scalars['Int']>;
  /** The unique ID for a `ConfigurableProductOptions` object. */
  uid: Scalars['ID'];
  /** Indicates whether the option is the default. */
  use_default?: Maybe<Scalars['Boolean']>;
  /** An array that defines the `value_index` codes assigned to the configurable product. */
  values?: Maybe<Array<Maybe<ConfigurableProductOptionsValues>>>;
};

/** Contains metadata corresponding to the selected configurable options. */
export type ConfigurableProductOptionsSelection = {
  __typename?: 'ConfigurableProductOptionsSelection';
  /** An array of all possible configurable options. */
  configurable_options?: Maybe<Array<Maybe<ConfigurableProductOption>>>;
  /** Product images and videos corresponding to the specified configurable options selection. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /** The configurable options available for further selection based on the current selection. */
  options_available_for_selection?: Maybe<Array<Maybe<ConfigurableOptionAvailableForSelection>>>;
  /** A variant represented by the specified configurable options selection. The value is expected to be null until selections are made for each configurable option. */
  variant?: Maybe<SimpleProduct>;
};

/** Contains the index number assigned to a configurable product option. */
export type ConfigurableProductOptionsValues = {
  __typename?: 'ConfigurableProductOptionsValues';
  /** The label of the product on the default store. */
  default_label?: Maybe<Scalars['String']>;
  /** The label of the product. */
  label?: Maybe<Scalars['String']>;
  /** The label of the product on the current store. */
  store_label?: Maybe<Scalars['String']>;
  /** Swatch data for a configurable product option. */
  swatch_data?: Maybe<SwatchDataInterface>;
  /** The unique ID for a `ConfigurableProductOptionsValues` object. */
  uid?: Maybe<Scalars['ID']>;
  /** Indicates whether to use the default_label. */
  use_default_value?: Maybe<Scalars['Boolean']>;
  /**
   * A unique index number assigned to the configurable product option.
   * @deprecated Use `uid` instead.
   */
  value_index?: Maybe<Scalars['Int']>;
};

/** Contains all the simple product variants of a configurable product. */
export type ConfigurableVariant = {
  __typename?: 'ConfigurableVariant';
  /** An array of configurable attribute options. */
  attributes?: Maybe<Array<Maybe<ConfigurableAttributeOption>>>;
  /** An array of linked simple products. */
  product?: Maybe<SimpleProduct>;
};

/** A configurable product wish list item. */
export type ConfigurableWishlistItem = WishlistItemInterface & {
  __typename?: 'ConfigurableWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String'];
  /**
   * The SKU of the simple product corresponding to a set of selected configurable options.
   * @deprecated Use `ConfigurableWishlistItem.configured_variant.sku` instead.
   */
  child_sku: Scalars['String'];
  /** An array of selected configurable options. */
  configurable_options?: Maybe<Array<Maybe<SelectedConfigurableOption>>>;
  /** Product details of the selected variant. The value is null if some options are not configured. */
  configured_variant?: Maybe<ProductInterface>;
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float'];
};

export type ContactSubmitInput = {
  form_data?: Maybe<Scalars['String']>;
};

export type ContactSubmitOutput = {
  __typename?: 'ContactSubmitOutput';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Country = {
  __typename?: 'Country';
  /** An array of regions within a particular country. */
  available_regions?: Maybe<Array<Maybe<Region>>>;
  /** The name of the country in English. */
  full_name_english?: Maybe<Scalars['String']>;
  /** The name of the country in the current locale. */
  full_name_locale?: Maybe<Scalars['String']>;
  /** The unique ID for a `Country` object. */
  id?: Maybe<Scalars['String']>;
  /** The three-letter abbreviation of the country, such as USA. */
  three_letter_abbreviation?: Maybe<Scalars['String']>;
  /** The two-letter abbreviation of the country, such as US. */
  two_letter_abbreviation?: Maybe<Scalars['String']>;
};

/** The list of country codes. */
export enum CountryCodeEnum {
  /** Afghanistan */
  Af = 'AF',
  /** Åland Islands */
  Ax = 'AX',
  /** Albania */
  Al = 'AL',
  /** Algeria */
  Dz = 'DZ',
  /** American Samoa */
  As = 'AS',
  /** Andorra */
  Ad = 'AD',
  /** Angola */
  Ao = 'AO',
  /** Anguilla */
  Ai = 'AI',
  /** Antarctica */
  Aq = 'AQ',
  /** Antigua & Barbuda */
  Ag = 'AG',
  /** Argentina */
  Ar = 'AR',
  /** Armenia */
  Am = 'AM',
  /** Aruba */
  Aw = 'AW',
  /** Australia */
  Au = 'AU',
  /** Austria */
  At = 'AT',
  /** Azerbaijan */
  Az = 'AZ',
  /** Bahamas */
  Bs = 'BS',
  /** Bahrain */
  Bh = 'BH',
  /** Bangladesh */
  Bd = 'BD',
  /** Barbados */
  Bb = 'BB',
  /** Belarus */
  By = 'BY',
  /** Belgium */
  Be = 'BE',
  /** Belize */
  Bz = 'BZ',
  /** Benin */
  Bj = 'BJ',
  /** Bermuda */
  Bm = 'BM',
  /** Bhutan */
  Bt = 'BT',
  /** Bolivia */
  Bo = 'BO',
  /** Bosnia & Herzegovina */
  Ba = 'BA',
  /** Botswana */
  Bw = 'BW',
  /** Bouvet Island */
  Bv = 'BV',
  /** Brazil */
  Br = 'BR',
  /** British Indian Ocean Territory */
  Io = 'IO',
  /** British Virgin Islands */
  Vg = 'VG',
  /** Brunei */
  Bn = 'BN',
  /** Bulgaria */
  Bg = 'BG',
  /** Burkina Faso */
  Bf = 'BF',
  /** Burundi */
  Bi = 'BI',
  /** Cambodia */
  Kh = 'KH',
  /** Cameroon */
  Cm = 'CM',
  /** Canada */
  Ca = 'CA',
  /** Cape Verde */
  Cv = 'CV',
  /** Cayman Islands */
  Ky = 'KY',
  /** Central African Republic */
  Cf = 'CF',
  /** Chad */
  Td = 'TD',
  /** Chile */
  Cl = 'CL',
  /** China */
  Cn = 'CN',
  /** Christmas Island */
  Cx = 'CX',
  /** Cocos (Keeling) Islands */
  Cc = 'CC',
  /** Colombia */
  Co = 'CO',
  /** Comoros */
  Km = 'KM',
  /** Congo-Brazzaville */
  Cg = 'CG',
  /** Congo-Kinshasa */
  Cd = 'CD',
  /** Cook Islands */
  Ck = 'CK',
  /** Costa Rica */
  Cr = 'CR',
  /** Côte d’Ivoire */
  Ci = 'CI',
  /** Croatia */
  Hr = 'HR',
  /** Cuba */
  Cu = 'CU',
  /** Cyprus */
  Cy = 'CY',
  /** Czech Republic */
  Cz = 'CZ',
  /** Denmark */
  Dk = 'DK',
  /** Djibouti */
  Dj = 'DJ',
  /** Dominica */
  Dm = 'DM',
  /** Dominican Republic */
  Do = 'DO',
  /** Ecuador */
  Ec = 'EC',
  /** Egypt */
  Eg = 'EG',
  /** El Salvador */
  Sv = 'SV',
  /** Equatorial Guinea */
  Gq = 'GQ',
  /** Eritrea */
  Er = 'ER',
  /** Estonia */
  Ee = 'EE',
  /** Ethiopia */
  Et = 'ET',
  /** Falkland Islands */
  Fk = 'FK',
  /** Faroe Islands */
  Fo = 'FO',
  /** Fiji */
  Fj = 'FJ',
  /** Finland */
  Fi = 'FI',
  /** France */
  Fr = 'FR',
  /** French Guiana */
  Gf = 'GF',
  /** French Polynesia */
  Pf = 'PF',
  /** French Southern Territories */
  Tf = 'TF',
  /** Gabon */
  Ga = 'GA',
  /** Gambia */
  Gm = 'GM',
  /** Georgia */
  Ge = 'GE',
  /** Germany */
  De = 'DE',
  /** Ghana */
  Gh = 'GH',
  /** Gibraltar */
  Gi = 'GI',
  /** Greece */
  Gr = 'GR',
  /** Greenland */
  Gl = 'GL',
  /** Grenada */
  Gd = 'GD',
  /** Guadeloupe */
  Gp = 'GP',
  /** Guam */
  Gu = 'GU',
  /** Guatemala */
  Gt = 'GT',
  /** Guernsey */
  Gg = 'GG',
  /** Guinea */
  Gn = 'GN',
  /** Guinea-Bissau */
  Gw = 'GW',
  /** Guyana */
  Gy = 'GY',
  /** Haiti */
  Ht = 'HT',
  /** Heard &amp; McDonald Islands */
  Hm = 'HM',
  /** Honduras */
  Hn = 'HN',
  /** Hong Kong SAR China */
  Hk = 'HK',
  /** Hungary */
  Hu = 'HU',
  /** Iceland */
  Is = 'IS',
  /** India */
  In = 'IN',
  /** Indonesia */
  Id = 'ID',
  /** Iran */
  Ir = 'IR',
  /** Iraq */
  Iq = 'IQ',
  /** Ireland */
  Ie = 'IE',
  /** Isle of Man */
  Im = 'IM',
  /** Israel */
  Il = 'IL',
  /** Italy */
  It = 'IT',
  /** Jamaica */
  Jm = 'JM',
  /** Japan */
  Jp = 'JP',
  /** Jersey */
  Je = 'JE',
  /** Jordan */
  Jo = 'JO',
  /** Kazakhstan */
  Kz = 'KZ',
  /** Kenya */
  Ke = 'KE',
  /** Kiribati */
  Ki = 'KI',
  /** Kuwait */
  Kw = 'KW',
  /** Kyrgyzstan */
  Kg = 'KG',
  /** Laos */
  La = 'LA',
  /** Latvia */
  Lv = 'LV',
  /** Lebanon */
  Lb = 'LB',
  /** Lesotho */
  Ls = 'LS',
  /** Liberia */
  Lr = 'LR',
  /** Libya */
  Ly = 'LY',
  /** Liechtenstein */
  Li = 'LI',
  /** Lithuania */
  Lt = 'LT',
  /** Luxembourg */
  Lu = 'LU',
  /** Macau SAR China */
  Mo = 'MO',
  /** Macedonia */
  Mk = 'MK',
  /** Madagascar */
  Mg = 'MG',
  /** Malawi */
  Mw = 'MW',
  /** Malaysia */
  My = 'MY',
  /** Maldives */
  Mv = 'MV',
  /** Mali */
  Ml = 'ML',
  /** Malta */
  Mt = 'MT',
  /** Marshall Islands */
  Mh = 'MH',
  /** Martinique */
  Mq = 'MQ',
  /** Mauritania */
  Mr = 'MR',
  /** Mauritius */
  Mu = 'MU',
  /** Mayotte */
  Yt = 'YT',
  /** Mexico */
  Mx = 'MX',
  /** Micronesia */
  Fm = 'FM',
  /** Moldova */
  Md = 'MD',
  /** Monaco */
  Mc = 'MC',
  /** Mongolia */
  Mn = 'MN',
  /** Montenegro */
  Me = 'ME',
  /** Montserrat */
  Ms = 'MS',
  /** Morocco */
  Ma = 'MA',
  /** Mozambique */
  Mz = 'MZ',
  /** Myanmar (Burma) */
  Mm = 'MM',
  /** Namibia */
  Na = 'NA',
  /** Nauru */
  Nr = 'NR',
  /** Nepal */
  Np = 'NP',
  /** Netherlands */
  Nl = 'NL',
  /** Netherlands Antilles */
  An = 'AN',
  /** New Caledonia */
  Nc = 'NC',
  /** New Zealand */
  Nz = 'NZ',
  /** Nicaragua */
  Ni = 'NI',
  /** Niger */
  Ne = 'NE',
  /** Nigeria */
  Ng = 'NG',
  /** Niue */
  Nu = 'NU',
  /** Norfolk Island */
  Nf = 'NF',
  /** Northern Mariana Islands */
  Mp = 'MP',
  /** North Korea */
  Kp = 'KP',
  /** Norway */
  No = 'NO',
  /** Oman */
  Om = 'OM',
  /** Pakistan */
  Pk = 'PK',
  /** Palau */
  Pw = 'PW',
  /** Palestinian Territories */
  Ps = 'PS',
  /** Panama */
  Pa = 'PA',
  /** Papua New Guinea */
  Pg = 'PG',
  /** Paraguay */
  Py = 'PY',
  /** Peru */
  Pe = 'PE',
  /** Philippines */
  Ph = 'PH',
  /** Pitcairn Islands */
  Pn = 'PN',
  /** Poland */
  Pl = 'PL',
  /** Portugal */
  Pt = 'PT',
  /** Qatar */
  Qa = 'QA',
  /** Réunion */
  Re = 'RE',
  /** Romania */
  Ro = 'RO',
  /** Russia */
  Ru = 'RU',
  /** Rwanda */
  Rw = 'RW',
  /** Samoa */
  Ws = 'WS',
  /** San Marino */
  Sm = 'SM',
  /** São Tomé & Príncipe */
  St = 'ST',
  /** Saudi Arabia */
  Sa = 'SA',
  /** Senegal */
  Sn = 'SN',
  /** Serbia */
  Rs = 'RS',
  /** Seychelles */
  Sc = 'SC',
  /** Sierra Leone */
  Sl = 'SL',
  /** Singapore */
  Sg = 'SG',
  /** Slovakia */
  Sk = 'SK',
  /** Slovenia */
  Si = 'SI',
  /** Solomon Islands */
  Sb = 'SB',
  /** Somalia */
  So = 'SO',
  /** South Africa */
  Za = 'ZA',
  /** South Georgia & South Sandwich Islands */
  Gs = 'GS',
  /** South Korea */
  Kr = 'KR',
  /** Spain */
  Es = 'ES',
  /** Sri Lanka */
  Lk = 'LK',
  /** St. Barthélemy */
  Bl = 'BL',
  /** St. Helena */
  Sh = 'SH',
  /** St. Kitts & Nevis */
  Kn = 'KN',
  /** St. Lucia */
  Lc = 'LC',
  /** St. Martin */
  Mf = 'MF',
  /** St. Pierre & Miquelon */
  Pm = 'PM',
  /** St. Vincent & Grenadines */
  Vc = 'VC',
  /** Sudan */
  Sd = 'SD',
  /** Suriname */
  Sr = 'SR',
  /** Svalbard & Jan Mayen */
  Sj = 'SJ',
  /** Swaziland */
  Sz = 'SZ',
  /** Sweden */
  Se = 'SE',
  /** Switzerland */
  Ch = 'CH',
  /** Syria */
  Sy = 'SY',
  /** Taiwan */
  Tw = 'TW',
  /** Tajikistan */
  Tj = 'TJ',
  /** Tanzania */
  Tz = 'TZ',
  /** Thailand */
  Th = 'TH',
  /** Timor-Leste */
  Tl = 'TL',
  /** Togo */
  Tg = 'TG',
  /** Tokelau */
  Tk = 'TK',
  /** Tonga */
  To = 'TO',
  /** Trinidad & Tobago */
  Tt = 'TT',
  /** Tunisia */
  Tn = 'TN',
  /** Turkey */
  Tr = 'TR',
  /** Turkmenistan */
  Tm = 'TM',
  /** Turks & Caicos Islands */
  Tc = 'TC',
  /** Tuvalu */
  Tv = 'TV',
  /** Uganda */
  Ug = 'UG',
  /** Ukraine */
  Ua = 'UA',
  /** United Arab Emirates */
  Ae = 'AE',
  /** United Kingdom */
  Gb = 'GB',
  /** United States */
  Us = 'US',
  /** Uruguay */
  Uy = 'UY',
  /** U.S. Outlying Islands */
  Um = 'UM',
  /** U.S. Virgin Islands */
  Vi = 'VI',
  /** Uzbekistan */
  Uz = 'UZ',
  /** Vanuatu */
  Vu = 'VU',
  /** Vatican City */
  Va = 'VA',
  /** Venezuela */
  Ve = 'VE',
  /** Vietnam */
  Vn = 'VN',
  /** Wallis & Futuna */
  Wf = 'WF',
  /** Western Sahara */
  Eh = 'EH',
  /** Yemen */
  Ye = 'YE',
  /** Zambia */
  Zm = 'ZM',
  /** Zimbabwe */
  Zw = 'ZW'
}

/** Contains an array of product IDs to use for creating a compare list. */
export type CreateCompareListInput = {
  /** An array of product IDs to add to the compare list. */
  products?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type CreateKlarnaPaymentsSessionOutput = {
  __typename?: 'CreateKlarnaPaymentsSessionOutput';
  /** The payment method client token */
  client_token?: Maybe<Scalars['String']>;
  /** The payment method categories */
  payment_method_categories?: Maybe<Array<Maybe<Categories>>>;
};

/** Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods. */
export type CreatePayflowProTokenOutput = {
  __typename?: 'CreatePayflowProTokenOutput';
  /** The RESPMSG returned by PayPal. If the `result` is `0`, then `response_message` is `Approved`. */
  response_message: Scalars['String'];
  /** A non-zero value if any errors occurred. */
  result: Scalars['Int'];
  /** The RESULT returned by PayPal. A value of `0` indicates the transaction was approved. */
  result_code: Scalars['Int'];
  /** A secure token generated by PayPal. */
  secure_token: Scalars['String'];
  /** A secure token ID generated by PayPal. */
  secure_token_id: Scalars['String'];
};

/** Defines a new product review. */
export type CreateProductReviewInput = {
  /** The customer's nickname. Defaults to the customer name, if logged in. */
  nickname: Scalars['String'];
  /** The ratings details by category. For example, Price: 5 stars, Quality: 4 stars, etc. */
  ratings: Array<Maybe<ProductReviewRatingInput>>;
  /** The SKU of the reviewed product. */
  sku: Scalars['String'];
  /** The summary (title) of the review. */
  summary: Scalars['String'];
  /** The review text. */
  text: Scalars['String'];
};

/** Contains the completed product review. */
export type CreateProductReviewOutput = {
  __typename?: 'CreateProductReviewOutput';
  /** Product review details. */
  review: ProductReview;
};

/** Required fields for Payflow Pro and Payments Pro credit card payments. */
export type CreditCardDetailsInput = {
  /** The credit card expiration month. */
  cc_exp_month: Scalars['Int'];
  /** The credit card expiration year. */
  cc_exp_year: Scalars['Int'];
  /** The last 4 digits of the credit card. */
  cc_last_4: Scalars['Int'];
  /** The credit card type. */
  cc_type: Scalars['String'];
};

/** Contains credit memo details. */
export type CreditMemo = {
  __typename?: 'CreditMemo';
  /** Comments on the credit memo. */
  comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
  /** The unique ID for a `CreditMemo` object. */
  id: Scalars['ID'];
  /** An array containing details about refunded items. */
  items?: Maybe<Array<Maybe<CreditMemoItemInterface>>>;
  /** The sequential credit memo number. */
  number: Scalars['String'];
  /** Details about the total refunded amount. */
  total?: Maybe<CreditMemoTotal>;
};

export type CreditMemoItem = CreditMemoItemInterface & {
  __typename?: 'CreditMemoItem';
  /** Details about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for a `CreditMemoItemInterface` object. */
  id: Scalars['ID'];
  /** The order item the credit memo is applied to. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']>;
};

/** Credit memo item details. */
export type CreditMemoItemInterface = {
  /** Details about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for a `CreditMemoItemInterface` object. */
  id: Scalars['ID'];
  /** The order item the credit memo is applied to. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']>;
};

/** Contains credit memo price details. */
export type CreditMemoTotal = {
  __typename?: 'CreditMemoTotal';
  /** An adjustment manually applied to the order. */
  adjustment: Money;
  /** The final base grand total amount in the base currency. */
  base_grand_total: Money;
  /** The applied discounts to the credit memo. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The final total amount, including shipping, discounts, and taxes. */
  grand_total: Money;
  /** Details about the shipping and handling costs for the credit memo. */
  shipping_handling?: Maybe<ShippingHandling>;
  /** The subtotal of the invoice, excluding shipping, discounts, and taxes. */
  subtotal: Money;
  /** The credit memo tax details. */
  taxes?: Maybe<Array<Maybe<TaxItem>>>;
  /** The shipping amount for the credit memo. */
  total_shipping: Money;
  /** The amount of tax applied to the credit memo. */
  total_tax: Money;
};

export type Currency = {
  __typename?: 'Currency';
  /** An array of three-letter currency codes accepted by the store, such as USD and EUR. */
  available_currency_codes?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The base currency set for the store, such as USD. */
  base_currency_code?: Maybe<Scalars['String']>;
  /** The symbol for the specified base currency, such as $. */
  base_currency_symbol?: Maybe<Scalars['String']>;
  /** @deprecated Symbol was missed. Use `default_display_currency_code`. */
  default_display_currecy_code?: Maybe<Scalars['String']>;
  /** @deprecated Symbol was missed. Use `default_display_currency_code`. */
  default_display_currecy_symbol?: Maybe<Scalars['String']>;
  /** The currency that is displayed by default, such as USD. */
  default_display_currency_code?: Maybe<Scalars['String']>;
  /** The currency symbol that is displayed by default, such as $. */
  default_display_currency_symbol?: Maybe<Scalars['String']>;
  /** An array of exchange rates for currencies defined in the store. */
  exchange_rates?: Maybe<Array<Maybe<ExchangeRate>>>;
};

/** The list of available currency codes. */
export enum CurrencyEnum {
  Afn = 'AFN',
  All = 'ALL',
  Azn = 'AZN',
  Dzd = 'DZD',
  Aoa = 'AOA',
  Ars = 'ARS',
  Amd = 'AMD',
  Awg = 'AWG',
  Aud = 'AUD',
  Bsd = 'BSD',
  Bhd = 'BHD',
  Bdt = 'BDT',
  Bbd = 'BBD',
  Byn = 'BYN',
  Bzd = 'BZD',
  Bmd = 'BMD',
  Btn = 'BTN',
  Bob = 'BOB',
  Bam = 'BAM',
  Bwp = 'BWP',
  Brl = 'BRL',
  Gbp = 'GBP',
  Bnd = 'BND',
  Bgn = 'BGN',
  Buk = 'BUK',
  Bif = 'BIF',
  Khr = 'KHR',
  Cad = 'CAD',
  Cve = 'CVE',
  Czk = 'CZK',
  Kyd = 'KYD',
  Gqe = 'GQE',
  Clp = 'CLP',
  Cny = 'CNY',
  Cop = 'COP',
  Kmf = 'KMF',
  Cdf = 'CDF',
  Crc = 'CRC',
  Hrk = 'HRK',
  Cup = 'CUP',
  Dkk = 'DKK',
  Djf = 'DJF',
  Dop = 'DOP',
  Xcd = 'XCD',
  Egp = 'EGP',
  Svc = 'SVC',
  Ern = 'ERN',
  Eek = 'EEK',
  Etb = 'ETB',
  Eur = 'EUR',
  Fkp = 'FKP',
  Fjd = 'FJD',
  Gmd = 'GMD',
  Gek = 'GEK',
  Gel = 'GEL',
  Ghs = 'GHS',
  Gip = 'GIP',
  Gtq = 'GTQ',
  Gnf = 'GNF',
  Gyd = 'GYD',
  Htg = 'HTG',
  Hnl = 'HNL',
  Hkd = 'HKD',
  Huf = 'HUF',
  Isk = 'ISK',
  Inr = 'INR',
  Idr = 'IDR',
  Irr = 'IRR',
  Iqd = 'IQD',
  Ils = 'ILS',
  Jmd = 'JMD',
  Jpy = 'JPY',
  Jod = 'JOD',
  Kzt = 'KZT',
  Kes = 'KES',
  Kwd = 'KWD',
  Kgs = 'KGS',
  Lak = 'LAK',
  Lvl = 'LVL',
  Lbp = 'LBP',
  Lsl = 'LSL',
  Lrd = 'LRD',
  Lyd = 'LYD',
  Ltl = 'LTL',
  Mop = 'MOP',
  Mkd = 'MKD',
  Mga = 'MGA',
  Mwk = 'MWK',
  Myr = 'MYR',
  Mvr = 'MVR',
  Lsm = 'LSM',
  Mro = 'MRO',
  Mur = 'MUR',
  Mxn = 'MXN',
  Mdl = 'MDL',
  Mnt = 'MNT',
  Mad = 'MAD',
  Mzn = 'MZN',
  Mmk = 'MMK',
  Nad = 'NAD',
  Npr = 'NPR',
  Ang = 'ANG',
  Ytl = 'YTL',
  Nzd = 'NZD',
  Nic = 'NIC',
  Ngn = 'NGN',
  Kpw = 'KPW',
  Nok = 'NOK',
  Omr = 'OMR',
  Pkr = 'PKR',
  Pab = 'PAB',
  Pgk = 'PGK',
  Pyg = 'PYG',
  Pen = 'PEN',
  Php = 'PHP',
  Pln = 'PLN',
  Qar = 'QAR',
  Rhd = 'RHD',
  Ron = 'RON',
  Rub = 'RUB',
  Rwf = 'RWF',
  Shp = 'SHP',
  Std = 'STD',
  Sar = 'SAR',
  Rsd = 'RSD',
  Scr = 'SCR',
  Sll = 'SLL',
  Sgd = 'SGD',
  Skk = 'SKK',
  Sbd = 'SBD',
  Sos = 'SOS',
  Zar = 'ZAR',
  Krw = 'KRW',
  Lkr = 'LKR',
  Sdg = 'SDG',
  Srd = 'SRD',
  Szl = 'SZL',
  Sek = 'SEK',
  Chf = 'CHF',
  Syp = 'SYP',
  Twd = 'TWD',
  Tjs = 'TJS',
  Tzs = 'TZS',
  Thb = 'THB',
  Top = 'TOP',
  Ttd = 'TTD',
  Tnd = 'TND',
  Tmm = 'TMM',
  Usd = 'USD',
  Ugx = 'UGX',
  Uah = 'UAH',
  Aed = 'AED',
  Uyu = 'UYU',
  Uzs = 'UZS',
  Vuv = 'VUV',
  Veb = 'VEB',
  Vef = 'VEF',
  Vnd = 'VND',
  Che = 'CHE',
  Chw = 'CHW',
  Xof = 'XOF',
  Wst = 'WST',
  Yer = 'YER',
  Zmk = 'ZMK',
  Zwd = 'ZWD',
  Try = 'TRY',
  Azm = 'AZM',
  Rol = 'ROL',
  Trl = 'TRL',
  Xpf = 'XPF'
}

/** Defines an array of custom attributes. */
export type CustomAttributeMetadata = {
  __typename?: 'CustomAttributeMetadata';
  /** An array of attributes. */
  items?: Maybe<Array<Maybe<Attribute>>>;
};

/** Defines the customer name, addresses, and other details. */
export type Customer = {
  __typename?: 'Customer';
  /** An array containing the customer's shipping and billing addresses. */
  addresses?: Maybe<Array<Maybe<CustomerAddress>>>;
  /** Indicates whether the customer has enabled remote shopping assistance. */
  allow_remote_shopping_assistance: Scalars['Boolean'];
  /** The contents of the customer's compare list. */
  compare_list?: Maybe<CompareList>;
  /** Timestamp indicating when the account was created. */
  created_at?: Maybe<Scalars['String']>;
  /** The customer's date of birth. */
  date_of_birth?: Maybe<Scalars['String']>;
  /** The ID assigned to the billing address. */
  default_billing?: Maybe<Scalars['String']>;
  /** The ID assigned to the shipping address. */
  default_shipping?: Maybe<Scalars['String']>;
  /**
   * The customer's date of birth.
   * @deprecated Use `date_of_birth` instead.
   */
  dob?: Maybe<Scalars['String']>;
  /** The customer's email address. Required. */
  email?: Maybe<Scalars['String']>;
  /** The customer's first name. */
  firstname?: Maybe<Scalars['String']>;
  /** The customer's gender (Male - 1, Female - 2). */
  gender?: Maybe<Scalars['Int']>;
  /** @deprecated Customer group should not be exposed in the storefront scenarios. */
  group_id?: Maybe<Scalars['Int']>;
  /**
   * The ID assigned to the customer.
   * @deprecated `id` is not needed as part of `Customer`, because on the server side, it can be identified based on the customer token used for authentication. There is no need to know customer ID on the client side.
   */
  id?: Maybe<Scalars['Int']>;
  /** Indicates whether the customer is subscribed to the company's newsletter. */
  is_subscribed?: Maybe<Scalars['Boolean']>;
  /** The customer's family name. */
  lastname?: Maybe<Scalars['String']>;
  /** The customer's middle name. */
  middlename?: Maybe<Scalars['String']>;
  orders?: Maybe<CustomerOrders>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']>;
  /** Contains the customer's product reviews. */
  reviews: ProductReviews;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']>;
  /** The customer's Value-added tax (VAT) number (for corporate customers). */
  taxvat?: Maybe<Scalars['String']>;
  /**
   * Return a customer's wish lists.
   * @deprecated Use `Customer.wishlists` or `Customer.wishlist_v2` instead.
   */
  wishlist: Wishlist;
  /** Retrieve the wish list identified by the unique ID for a `Wishlist` object. */
  wishlist_v2?: Maybe<Wishlist>;
  /** An array of wishlists. In Magento Open Source, customers are limited to one wish list. The number of wish lists is configurable for Adobe Commerce. */
  wishlists: Array<Maybe<Wishlist>>;
};


/** Defines the customer name, addresses, and other details. */
export type CustomerOrdersArgs = {
  filter?: Maybe<CustomerOrdersFilterInput>;
  currentPage?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};


/** Defines the customer name, addresses, and other details. */
export type CustomerReviewsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};


/** Defines the customer name, addresses, and other details. */
export type CustomerWishlist_V2Args = {
  id: Scalars['ID'];
};


/** Defines the customer name, addresses, and other details. */
export type CustomerWishlistsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

/** Contains detailed information about a customer's billing or shipping address. */
export type CustomerAddress = {
  __typename?: 'CustomerAddress';
  /** The customer's city or town. */
  city?: Maybe<Scalars['String']>;
  /** The customer's company. */
  company?: Maybe<Scalars['String']>;
  /** The customer's country. */
  country_code?: Maybe<CountryCodeEnum>;
  /**
   * The customer's country.
   * @deprecated Use `country_code` instead.
   */
  country_id?: Maybe<Scalars['String']>;
  /** @deprecated Custom attributes should not be put into a container. */
  custom_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>;
  /**
   * The customer ID
   * @deprecated `customer_id` is not needed as part of `CustomerAddress`. The `id` is a unique identifier for the addresses.
   */
  customer_id?: Maybe<Scalars['Int']>;
  /** Indicates whether the address is the customer's default billing address. */
  default_billing?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the address is the customer's default shipping address. */
  default_shipping?: Maybe<Scalars['Boolean']>;
  /** Contains any extension attributes for the address. */
  extension_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>;
  /** The customer's fax number. */
  fax?: Maybe<Scalars['String']>;
  /** The first name of the person associated with the shipping/billing address. */
  firstname?: Maybe<Scalars['String']>;
  /** The ID of a `CustomerAddress` object. */
  id?: Maybe<Scalars['Int']>;
  /** The family name of the person associated with the shipping/billing address. */
  lastname?: Maybe<Scalars['String']>;
  /** The middle name of the person associated with the shipping/billing address. */
  middlename?: Maybe<Scalars['String']>;
  /** The customer's ZIP or postal code. */
  postcode?: Maybe<Scalars['String']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']>;
  /** An object containing the region name, region code, and region ID. */
  region?: Maybe<CustomerAddressRegion>;
  /** The unique ID for a pre-defined region. */
  region_id?: Maybe<Scalars['Int']>;
  /** An array of strings that define the street number and name. */
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']>;
  /** The customer's telephone number. */
  telephone?: Maybe<Scalars['String']>;
  /** The customer's Value-added tax (VAT) number (for corporate customers). */
  vat_id?: Maybe<Scalars['String']>;
};

/** Specifies the attribute code and value of a customer address attribute. */
export type CustomerAddressAttribute = {
  __typename?: 'CustomerAddressAttribute';
  /** The name assigned to the customer address attribute. */
  attribute_code?: Maybe<Scalars['String']>;
  /** The valuue assigned to the customer address attribute. */
  value?: Maybe<Scalars['String']>;
};

/** Specifies the attribute code and value of a customer attribute. */
export type CustomerAddressAttributeInput = {
  /** The name assigned to the attribute. */
  attribute_code: Scalars['String'];
  /** The value assigned to the attribute. */
  value: Scalars['String'];
};

/** Contains details about a billing or shipping address. */
export type CustomerAddressInput = {
  /** The customer's city or town. */
  city?: Maybe<Scalars['String']>;
  /** The customer's company. */
  company?: Maybe<Scalars['String']>;
  /** The two-letter code representing the customer's country. */
  country_code?: Maybe<CountryCodeEnum>;
  /** Deprecated: use `country_code` instead. */
  country_id?: Maybe<CountryCodeEnum>;
  /** Deprecated: Custom attributes should not be put into container. */
  custom_attributes?: Maybe<Array<Maybe<CustomerAddressAttributeInput>>>;
  /** Indicates whether the address is the default billing address. */
  default_billing?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the address is the default shipping address. */
  default_shipping?: Maybe<Scalars['Boolean']>;
  /** The customer's fax number. */
  fax?: Maybe<Scalars['String']>;
  /** The first name of the person associated with the billing/shipping address. */
  firstname?: Maybe<Scalars['String']>;
  /** The family name of the person associated with the billing/shipping address. */
  lastname?: Maybe<Scalars['String']>;
  /** The middle name of the person associated with the billing/shipping address. */
  middlename?: Maybe<Scalars['String']>;
  /** The customer's ZIP or postal code. */
  postcode?: Maybe<Scalars['String']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']>;
  /** An object containing the region name, region code, and region ID. */
  region?: Maybe<CustomerAddressRegionInput>;
  /** An array of strings that define the street number and name. */
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']>;
  /** The customer's telephone number. */
  telephone?: Maybe<Scalars['String']>;
  /** The customer's Tax/VAT number (for corporate customers). */
  vat_id?: Maybe<Scalars['String']>;
};

/** Defines the customer's state or province. */
export type CustomerAddressRegion = {
  __typename?: 'CustomerAddressRegion';
  /** The state or province name. */
  region?: Maybe<Scalars['String']>;
  /** The address region code. */
  region_code?: Maybe<Scalars['String']>;
  /** The unique ID for a pre-defined region. */
  region_id?: Maybe<Scalars['Int']>;
};

/** Defines the customer's state or province. */
export type CustomerAddressRegionInput = {
  /** The state or province name. */
  region?: Maybe<Scalars['String']>;
  /** The address region code. */
  region_code?: Maybe<Scalars['String']>;
  /** The unique ID for a pre-defined region. */
  region_id?: Maybe<Scalars['Int']>;
};

/** An input object for creating a customer. */
export type CustomerCreateInput = {
  /** Indicates whether the customer has enabled remote shopping assistance. */
  allow_remote_shopping_assistance?: Maybe<Scalars['Boolean']>;
  /** The customer's date of birth. */
  date_of_birth?: Maybe<Scalars['String']>;
  /** Deprecated: Use `date_of_birth` instead. */
  dob?: Maybe<Scalars['String']>;
  /** The customer's email address. */
  email: Scalars['String'];
  /** The customer's first name. */
  firstname: Scalars['String'];
  /** The customer's gender (Male - 1, Female - 2). */
  gender?: Maybe<Scalars['Int']>;
  /** Indicates whether the customer is subscribed to the company's newsletter. */
  is_subscribed?: Maybe<Scalars['Boolean']>;
  /** The customer's family name. */
  lastname: Scalars['String'];
  /** The customer's middle name. */
  middlename?: Maybe<Scalars['String']>;
  /** The customer's password. */
  password?: Maybe<Scalars['String']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']>;
  /** The customer's Tax/VAT number (for corporate customers). */
  taxvat?: Maybe<Scalars['String']>;
};

/** Contains details about a single downloadable product. */
export type CustomerDownloadableProduct = {
  __typename?: 'CustomerDownloadableProduct';
  /** The date and time the purchase was made. */
  date?: Maybe<Scalars['String']>;
  /** The fully qualified URL to the download file. */
  download_url?: Maybe<Scalars['String']>;
  /** The unique ID assigned to the item. */
  order_increment_id?: Maybe<Scalars['String']>;
  /** The remaining number of times the customer can download the product. */
  remaining_downloads?: Maybe<Scalars['String']>;
  /** Indicates when the product becomes available for download. Options are `Pending` and `Invoiced`. */
  status?: Maybe<Scalars['String']>;
};

/** Contains a list of downloadable products. */
export type CustomerDownloadableProducts = {
  __typename?: 'CustomerDownloadableProducts';
  /** An array of purchased downloadable items. */
  items?: Maybe<Array<Maybe<CustomerDownloadableProduct>>>;
};

/** An input object that assigns or updates customer attributes. */
export type CustomerInput = {
  /** The customer's date of birth. */
  date_of_birth?: Maybe<Scalars['String']>;
  /** Deprecated: Use `date_of_birth` instead. */
  dob?: Maybe<Scalars['String']>;
  /** The customer's email address. Required when creating a customer. */
  email?: Maybe<Scalars['String']>;
  /** The customer's first name. */
  firstname?: Maybe<Scalars['String']>;
  /** The customer's gender (Male - 1, Female - 2). */
  gender?: Maybe<Scalars['Int']>;
  /** Indicates whether the customer is subscribed to the company's newsletter. */
  is_subscribed?: Maybe<Scalars['Boolean']>;
  /** The customer's family name. */
  lastname?: Maybe<Scalars['String']>;
  /** The customer's middle name. */
  middlename?: Maybe<Scalars['String']>;
  /** The customer's password. */
  password?: Maybe<Scalars['String']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']>;
  /** The customer's Tax/VAT number (for corporate customers). */
  taxvat?: Maybe<Scalars['String']>;
};

/** Contains details about each of the customer's orders. */
export type CustomerOrder = {
  __typename?: 'CustomerOrder';
  /** The billing address for the order. */
  billing_address?: Maybe<OrderAddress>;
  /** The shipping carrier for the order delivery. */
  carrier?: Maybe<Scalars['String']>;
  /** Comments about the order. */
  comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
  /** @deprecated Use the `order_date` field instead. */
  created_at?: Maybe<Scalars['String']>;
  /** A list of credit memos. */
  credit_memos?: Maybe<Array<Maybe<CreditMemo>>>;
  /** The entered gift message for the order */
  gift_message?: Maybe<GiftMessage>;
  /** @deprecated Use the `totals.grand_total` field instead. */
  grand_total?: Maybe<Scalars['Float']>;
  /** The unique ID for a `CustomerOrder` object. */
  id: Scalars['ID'];
  /** @deprecated Use the `id` field instead. */
  increment_id?: Maybe<Scalars['String']>;
  /** A list of invoices for the order. */
  invoices: Array<Maybe<Invoice>>;
  /** An array containing the items purchased in this order. */
  items?: Maybe<Array<Maybe<OrderItemInterface>>>;
  /** The order number. */
  number: Scalars['String'];
  /** The date the order was placed. */
  order_date: Scalars['String'];
  /** @deprecated Use the `number` field instead. */
  order_number: Scalars['String'];
  /** Payment details for the order. */
  payment_methods?: Maybe<Array<Maybe<OrderPaymentMethod>>>;
  /** A list of shipments for the order. */
  shipments?: Maybe<Array<Maybe<OrderShipment>>>;
  /** The shipping address for the order. */
  shipping_address?: Maybe<OrderAddress>;
  /** The delivery method for the order. */
  shipping_method?: Maybe<Scalars['String']>;
  /** The current status of the order. */
  status: Scalars['String'];
  /** Details about the calculated totals for this order. */
  total?: Maybe<OrderTotal>;
};

/** The collection of orders that match the conditions defined in the filter. */
export type CustomerOrders = {
  __typename?: 'CustomerOrders';
  /** An array of customer orders. */
  items: Array<Maybe<CustomerOrder>>;
  /** Contains pagination metadata. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The total count of customer orders. */
  total_count?: Maybe<Scalars['Int']>;
};

/** Identifies the filter to use for filtering orders. */
export type CustomerOrdersFilterInput = {
  /** Filters by order number. */
  number?: Maybe<FilterStringTypeInput>;
};

/** Contains details about a newly-created or updated customer. */
export type CustomerOutput = {
  __typename?: 'CustomerOutput';
  /** Customer details after creating or updating a customer. */
  customer: Customer;
};

/** Contains payment tokens stored in the customer's vault. */
export type CustomerPaymentTokens = {
  __typename?: 'CustomerPaymentTokens';
  /** An array of payment tokens. */
  items: Array<Maybe<PaymentToken>>;
};

/** Contains a customer authorization token. */
export type CustomerToken = {
  __typename?: 'CustomerToken';
  /** The customer authorization token. */
  token?: Maybe<Scalars['String']>;
};

/** An input object for updating a customer. */
export type CustomerUpdateInput = {
  /** Indicates whether the customer has enabled remote shopping assistance. */
  allow_remote_shopping_assistance?: Maybe<Scalars['Boolean']>;
  /** The customer's date of birth. */
  date_of_birth?: Maybe<Scalars['String']>;
  /** Deprecated: Use `date_of_birth` instead. */
  dob?: Maybe<Scalars['String']>;
  /** The customer's first name. */
  firstname?: Maybe<Scalars['String']>;
  /** The customer's gender (Male - 1, Female - 2). */
  gender?: Maybe<Scalars['Int']>;
  /** Indicates whether the customer is subscribed to the company's newsletter. */
  is_subscribed?: Maybe<Scalars['Boolean']>;
  /** The customer's family name. */
  lastname?: Maybe<Scalars['String']>;
  /** The customer's middle name. */
  middlename?: Maybe<Scalars['String']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']>;
  /** The customer's Tax/VAT number (for corporate customers). */
  taxvat?: Maybe<Scalars['String']>;
};

/** Contains information about a text area that is defined as part of a customizable option. */
export type CustomizableAreaOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableAreaOption';
  customer_group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** The Stock Keeping Unit of the base product. */
  product_sku?: Maybe<Scalars['String']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  store_view?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID'];
  /** An object that defines a text area. */
  value?: Maybe<CustomizableAreaValue>;
};

/** Defines the price and sku of a product whose page contains a customized text area. */
export type CustomizableAreaValue = {
  __typename?: 'CustomizableAreaValue';
  /** The maximum number of characters that can be entered for this customizable option. */
  max_characters?: Maybe<Scalars['Int']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableAreaValue` object. */
  uid: Scalars['ID'];
};

/** Contains information about a set of checkbox values that are defined as part of a customizable option. */
export type CustomizableCheckboxOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableCheckboxOption';
  customer_group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  store_view?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID'];
  /** An array that defines a set of checkbox values. */
  value?: Maybe<Array<Maybe<CustomizableCheckboxValue>>>;
};

/** Defines the price and sku of a product whose page contains a customized set of checkbox values. */
export type CustomizableCheckboxValue = {
  __typename?: 'CustomizableCheckboxValue';
  base_image?: Maybe<Scalars['String']>;
  dependency?: Maybe<Scalars['String']>;
  dependency_type?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  is_default?: Maybe<Scalars['Boolean']>;
  mageworx_option_type_price?: Maybe<Scalars['String']>;
  option_id?: Maybe<Scalars['String']>;
  /** The ID assigned to the value. */
  option_type_id?: Maybe<Scalars['Int']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']>;
  /** The order in which the checkbox value is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  special_price?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableCheckboxValue` object. */
  uid: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
};

/** Contains information about a date picker that is defined as part of a customizable option. */
export type CustomizableDateOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableDateOption';
  customer_group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** The Stock Keeping Unit of the base product. */
  product_sku?: Maybe<Scalars['String']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  store_view?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID'];
  /** An object that defines a date field in a customizable option. */
  value?: Maybe<CustomizableDateValue>;
};

/** Defines the customizable date type. */
export enum CustomizableDateTypeEnum {
  Date = 'DATE',
  DateTime = 'DATE_TIME',
  Time = 'TIME'
}

/** Defines the price and sku of a product whose page contains a customized date picker. */
export type CustomizableDateValue = {
  __typename?: 'CustomizableDateValue';
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']>;
  /** DATE, DATE_TIME or TIME */
  type?: Maybe<CustomizableDateTypeEnum>;
  /** The unique ID for a `CustomizableDateValue` object. */
  uid: Scalars['ID'];
};

/** Contains information about a drop down menu that is defined as part of a customizable option. */
export type CustomizableDropDownOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableDropDownOption';
  customer_group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  store_view?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID'];
  /** An array that defines the set of options for a drop down menu. */
  value?: Maybe<Array<Maybe<CustomizableDropDownValue>>>;
};

/** Defines the price and sku of a product whose page contains a customized drop down menu. */
export type CustomizableDropDownValue = {
  __typename?: 'CustomizableDropDownValue';
  base_image?: Maybe<Scalars['String']>;
  dependency?: Maybe<Scalars['String']>;
  dependency_type?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  is_default?: Maybe<Scalars['Boolean']>;
  mageworx_option_type_price?: Maybe<Scalars['String']>;
  option_id?: Maybe<Scalars['String']>;
  /** The ID assigned to the value. */
  option_type_id?: Maybe<Scalars['Int']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  special_price?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableDropDownValue` object. */
  uid: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
};

/** Contains information about a text field that is defined as part of a customizable option. */
export type CustomizableFieldOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableFieldOption';
  customer_group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** The Stock Keeping Unit of the base product. */
  product_sku?: Maybe<Scalars['String']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  store_view?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID'];
  /** An object that defines a text field. */
  value?: Maybe<CustomizableFieldValue>;
};

/** Defines the price and sku of a product whose page contains a customized text field. */
export type CustomizableFieldValue = {
  __typename?: 'CustomizableFieldValue';
  /** The maximum number of characters that can be entered for this customizable option. */
  max_characters?: Maybe<Scalars['Int']>;
  /** The price of the custom value. */
  price?: Maybe<Scalars['Float']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableFieldValue` object. */
  uid: Scalars['ID'];
};

/** Contains information about a file picker that is defined as part of a customizable option. */
export type CustomizableFileOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableFileOption';
  customer_group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** The Stock Keeping Unit of the base product. */
  product_sku?: Maybe<Scalars['String']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  store_view?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID'];
  /** An object that defines a file value. */
  value?: Maybe<CustomizableFileValue>;
};

/** Defines the price and sku of a product whose page contains a customized file picker. */
export type CustomizableFileValue = {
  __typename?: 'CustomizableFileValue';
  /** The file extension to accept. */
  file_extension?: Maybe<Scalars['String']>;
  /** The maximum width of an image. */
  image_size_x?: Maybe<Scalars['Int']>;
  /** The maximum height of an image. */
  image_size_y?: Maybe<Scalars['Int']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableFileValue` object. */
  uid: Scalars['ID'];
};

/** Contains information about a multiselect that is defined as part of a customizable option. */
export type CustomizableMultipleOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableMultipleOption';
  customer_group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  store_view?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID'];
  /** An array that defines the set of options for a multiselect. */
  value?: Maybe<Array<Maybe<CustomizableMultipleValue>>>;
};

/** Defines the price and sku of a product whose page contains a customized multiselect. */
export type CustomizableMultipleValue = {
  __typename?: 'CustomizableMultipleValue';
  base_image?: Maybe<Scalars['String']>;
  dependency?: Maybe<Scalars['String']>;
  dependency_type?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  is_default?: Maybe<Scalars['Boolean']>;
  mageworx_option_type_price?: Maybe<Scalars['String']>;
  option_id?: Maybe<Scalars['String']>;
  /** The ID assigned to the value. */
  option_type_id?: Maybe<Scalars['Int']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  special_price?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableMultipleValue` object. */
  uid: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
};

/** Defines a customizable option. */
export type CustomizableOptionInput = {
  /** The customizable option ID of the product. */
  id?: Maybe<Scalars['Int']>;
  /** The string value of the option. */
  value_string: Scalars['String'];
};

/** Contains basic information about a customizable option. It can be implemented by several types of configurable options. */
export type CustomizableOptionInterface = {
  customer_group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  store_view?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID'];
};

/** Contains information about customizable product options. */
export type CustomizableProductInterface = {
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
};

/** Contains information about a set of radio buttons that are defined as part of a customizable option. */
export type CustomizableRadioOption = CustomizableOptionInterface & {
  __typename?: 'CustomizableRadioOption';
  customer_group?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  /**
   * Option ID.
   * @deprecated Use `uid` instead
   */
  option_id?: Maybe<Scalars['Int']>;
  /** Indicates whether the option is required. */
  required?: Maybe<Scalars['Boolean']>;
  /** The order in which the option is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  store_view?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableOptionInterface` object. */
  uid: Scalars['ID'];
  /** An array that defines a set of radio buttons. */
  value?: Maybe<Array<Maybe<CustomizableRadioValue>>>;
};

/** Defines the price and sku of a product whose page contains a customized set of radio buttons. */
export type CustomizableRadioValue = {
  __typename?: 'CustomizableRadioValue';
  base_image?: Maybe<Scalars['String']>;
  dependency?: Maybe<Scalars['String']>;
  dependency_type?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  is_default?: Maybe<Scalars['Boolean']>;
  mageworx_option_type_price?: Maybe<Scalars['String']>;
  option_id?: Maybe<Scalars['String']>;
  /** The ID assigned to the value. */
  option_type_id?: Maybe<Scalars['Int']>;
  /** The price assigned to this option. */
  price?: Maybe<Scalars['Float']>;
  /** FIXED, PERCENT, or DYNAMIC. */
  price_type?: Maybe<PriceTypeEnum>;
  /** The Stock Keeping Unit for this option. */
  sku?: Maybe<Scalars['String']>;
  /** The order in which the radio button is displayed. */
  sort_order?: Maybe<Scalars['Int']>;
  special_price?: Maybe<Scalars['String']>;
  /** The display name for this option. */
  title?: Maybe<Scalars['String']>;
  /** The unique ID for a `CustomizableRadioValue` object. */
  uid: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
};

/** Contains the results of the request to delete a compare list. */
export type DeleteCompareListOutput = {
  __typename?: 'DeleteCompareListOutput';
  /** Indicates whether the compare list was successfully deleted. */
  result: Scalars['Boolean'];
};

/** Indicates whether the request succeeded and returns the remaining customer payment tokens. */
export type DeletePaymentTokenOutput = {
  __typename?: 'DeletePaymentTokenOutput';
  /** A container for the customer's remaining payment tokens. */
  customerPaymentTokens?: Maybe<CustomerPaymentTokens>;
  /** Indicates whether the request succeeded. */
  result: Scalars['Boolean'];
};

export type DeliveryNextDay = {
  __typename?: 'DeliveryNextDay';
  limit_dates?: Maybe<Array<Maybe<Scalars['String']>>>;
  min_date?: Maybe<Scalars['String']>;
};

/** Defines an individual discount. A discount can be applied to the cart as a whole or to an item. */
export type Discount = {
  __typename?: 'Discount';
  /** The amount of the discount. */
  amount: Money;
  /** A description of the discount. */
  label: Scalars['String'];
};

/** An implementation for downloadable product cart items. */
export type DownloadableCartItem = CartItemInterface & {
  __typename?: 'DownloadableCartItem';
  /** An array containing the customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  date_picker?: Maybe<Scalars['String']>;
  delivery_warning?: Maybe<Scalars['String']>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String'];
  /** An array containing information about the links for the downloadable product added to the cart. */
  links?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float'];
  /** An array containing information about samples of the selected downloadable product. */
  samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID'];
};

/** Defines downloadable product options for `CreditMemoItemInterface`. */
export type DownloadableCreditMemoItem = CreditMemoItemInterface & {
  __typename?: 'DownloadableCreditMemoItem';
  /** Details about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** A list of downloadable links that are refunded from the downloadable product. */
  downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>;
  /** The unique ID for a `CreditMemoItemInterface` object. */
  id: Scalars['ID'];
  /** The order item the credit memo is applied to. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']>;
};

export enum DownloadableFileTypeEnum {
  File = 'FILE',
  Url = 'URL'
}

/** Defines downloadable product options for `InvoiceItemInterface`. */
export type DownloadableInvoiceItem = InvoiceItemInterface & {
  __typename?: 'DownloadableInvoiceItem';
  /** Information about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** A list of downloadable links that are invoiced from the downloadable product. */
  downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>;
  /** The unique ID for an `InvoiceItemInterface` object. */
  id: Scalars['ID'];
  /** Details about an individual order item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']>;
};

/** Defines characteristics of the links for downloadable product. */
export type DownloadableItemsLinks = {
  __typename?: 'DownloadableItemsLinks';
  /** A number indicating the sort order. */
  sort_order?: Maybe<Scalars['Int']>;
  /** The display name of the link. */
  title?: Maybe<Scalars['String']>;
  /** The unique ID for a `DownloadableItemsLinks` object. */
  uid: Scalars['ID'];
};

/** Defines downloadable product options for `OrderItemInterface`. */
export type DownloadableOrderItem = OrderItemInterface & {
  __typename?: 'DownloadableOrderItem';
  additional_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The final discount information for the product. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** A list of downloadable links that are ordered from the downloadable product. */
  downloadable_links?: Maybe<Array<Maybe<DownloadableItemsLinks>>>;
  /** The entered option for the base product, such as a logo or image. */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The unique ID for an `OrderItemInterface` object. */
  id: Scalars['ID'];
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price of the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']>;
  /** URL key of the base product. */
  product_url_key?: Maybe<Scalars['String']>;
  /** The number of canceled items. */
  quantity_canceled?: Maybe<Scalars['Float']>;
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']>;
  /** The number of units ordered for this item. */
  quantity_ordered?: Maybe<Scalars['Float']>;
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']>;
  /** The number of returned items. */
  quantity_returned?: Maybe<Scalars['Float']>;
  /** The number of shipped items. */
  quantity_shipped?: Maybe<Scalars['Float']>;
  /** The selected options for the base product, such as color or size. */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item. */
  status?: Maybe<Scalars['String']>;
};

/** Defines a product that the shopper downloads. */
export type DownloadableProduct = ProductInterface & RoutableInterface & CustomizableProductInterface & {
  __typename?: 'DownloadableProduct';
  /** Add to cart url. */
  add_to_cart_url?: Maybe<Scalars['String']>;
  /** Add to wishlist information. */
  add_to_wishlist?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  additional_features?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  assembly_type?: Maybe<Scalars['Int']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_colours?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_sizes?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  back_stock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  backstock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  barcode?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  base_slat_type?: Maybe<Scalars['Int']>;
  /** Custom data in bedkingdom website */
  bed_data?: Maybe<BedData>;
  /** @deprecated Use the `custom_attributes` field instead. */
  benifts?: Maybe<Scalars['String']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  chair_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  colour?: Maybe<Scalars['String']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  delivery?: Maybe<Scalars['Int']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dimentions?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dining_chairs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_drawers?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_fabric?: Maybe<Scalars['Int']>;
  /** An array containing information about the links for this downloadable product. */
  downloadable_product_links?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
  /** An array containing information about samples of this downloadable product. */
  downloadable_product_samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  exchange_return_upgrade?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  feet_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  filling_type_search?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  fold_mechanism?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  free_delivery?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  furniture_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ggiftcard_amount_config?: Maybe<Scalars['String']>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gtin?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  guarantee?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  headboard_included?: Maybe<Scalars['Int']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ladder?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  leg_diameter?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  length?: Maybe<Scalars['String']>;
  /** A value of 1 indicates that each link in the array must be purchased separately. */
  links_purchased_separately?: Maybe<Scalars['Int']>;
  /** The heading above the list of downloadable products. */
  links_title?: Maybe<Scalars['String']>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  matching_headboard?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  material_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_bundle?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_depth?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_tention?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_turn?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_type?: Maybe<Scalars['Int']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mpn?: Maybe<Scalars['String']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  nocupboards?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  number_of_springs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  numberdrawers?: Maybe<Scalars['Int']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  optional_extras?: Maybe<Scalars['Int']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Product url. */
  product_url?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ranges?: Maybe<Scalars['Int']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  room_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  seat_type?: Maybe<Scalars['Int']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  size?: Maybe<Scalars['Int']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  split?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type_search?: Maybe<Scalars['Int']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  stompa_colours?: Maybe<Scalars['Int']>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_top_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  temperature_control_fabric?: Maybe<Scalars['Int']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  top_bunk_size?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_options?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_size?: Maybe<Scalars['Int']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  udropship_vendor?: Maybe<Scalars['Int']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  wardrobe_doors?: Maybe<Scalars['Int']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
};


/** Defines a product that the shopper downloads. */
export type DownloadableProductReviewsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

/** Defines a single downloadable product. */
export type DownloadableProductCartItemInput = {
  /** The ID and value of the option. */
  customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>;
  /** The quantity and SKU of the downloadable product. */
  data: CartItemInput;
  /** An array of objects containing the link_id of the downloadable product link. */
  downloadable_product_links?: Maybe<Array<Maybe<DownloadableProductLinksInput>>>;
};

/** Defines characteristics of a downloadable product. */
export type DownloadableProductLinks = {
  __typename?: 'DownloadableProductLinks';
  /** @deprecated This information should not be exposed on frontend. */
  id?: Maybe<Scalars['Int']>;
  /** @deprecated This information should not be exposed on frontend. */
  is_shareable?: Maybe<Scalars['Boolean']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  link_type?: Maybe<DownloadableFileTypeEnum>;
  /** @deprecated This information should not be exposed on frontend. */
  number_of_downloads?: Maybe<Scalars['Int']>;
  /** The price of the downloadable product. */
  price?: Maybe<Scalars['Float']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  sample_file?: Maybe<Scalars['String']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  sample_type?: Maybe<DownloadableFileTypeEnum>;
  /** The full URL to the downloadable sample. */
  sample_url?: Maybe<Scalars['String']>;
  /** A number indicating the sort order. */
  sort_order?: Maybe<Scalars['Int']>;
  /** The display name of the link. */
  title?: Maybe<Scalars['String']>;
  /** The unique ID for a `DownloadableProductLinks` object. */
  uid: Scalars['ID'];
};

/** Contains the link ID for the downloadable product. */
export type DownloadableProductLinksInput = {
  /** The unique ID of the downloadable product link. */
  link_id: Scalars['Int'];
};

/** Defines characteristics of a downloadable product. */
export type DownloadableProductSamples = {
  __typename?: 'DownloadableProductSamples';
  /** @deprecated This information should not be exposed on frontend. */
  id?: Maybe<Scalars['Int']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  sample_file?: Maybe<Scalars['String']>;
  /** @deprecated `sample_url` serves to get the downloadable sample */
  sample_type?: Maybe<DownloadableFileTypeEnum>;
  /** The full URL to the downloadable sample. */
  sample_url?: Maybe<Scalars['String']>;
  /** A number indicating the sort order. */
  sort_order?: Maybe<Scalars['Int']>;
  /** The display name of the sample. */
  title?: Maybe<Scalars['String']>;
};

/** A downloadable product wish list item. */
export type DownloadableWishlistItem = WishlistItemInterface & {
  __typename?: 'DownloadableWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID'];
  /** An array containing information about the selected links. */
  links_v2?: Maybe<Array<Maybe<DownloadableProductLinks>>>;
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float'];
  /** An array containing information about the selected samples. */
  samples?: Maybe<Array<Maybe<DownloadableProductSamples>>>;
};

/** Defines a customer-entered option. */
export type EnteredOptionInput = {
  /** The unique ID for a `CustomizableOptionInterface` object, such as a `CustomizableFieldOption`, `CustomizableFileOption`, or `CustomizableAreaOption` object. */
  uid: Scalars['ID'];
  /** Text the customer entered. */
  value: Scalars['String'];
};

/** Contains the `uid`, `relative_url`, and `type` attributes. */
export type EntityUrl = {
  __typename?: 'EntityUrl';
  /** @deprecated Use `relative_url` instead. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The unique ID for a `ProductInterface`, `CategoryInterface`, `CmsPage`, or similar object associated with the specified URL. This could be a product, category, or CMS page UID. */
  entity_uid?: Maybe<Scalars['ID']>;
  /**
   * The ID assigned to the object associated with the specified url. This could be a product ID, category ID, or page ID.
   * @deprecated Use `entity_uid` instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirectCode?: Maybe<Scalars['Int']>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
};

export type ErrorInterface = {
  /** The returned error message. */
  message: Scalars['String'];
};

/** Lists the exchange rate. */
export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  /** Specifies the store’s default currency to exchange to. */
  currency_to?: Maybe<Scalars['String']>;
  /** The exchange rate for the store’s default currency. */
  rate?: Maybe<Scalars['Float']>;
};

export type ExternalWordpressPost = {
  __typename?: 'ExternalWordpressPost';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** Defines a filter that matches the input exactly. */
export type FilterEqualTypeInput = {
  /** Use this attribute to exactly match the specified string. For example, to filter on a specific category ID, specify a value such as `5`. */
  eq?: Maybe<Scalars['String']>;
  /** Use this attribute to filter on an array of values. For example, to filter on category IDs 4, 5, and 6, specify a value of `["4", "5", "6"]`. */
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Defines a filter that performs a fuzzy search. */
export type FilterMatchTypeInput = {
  /** Use this attribute to exactly match the specified string. For example, to filter on a specific SKU, specify a value such as `24-MB01`. */
  match?: Maybe<Scalars['String']>;
};

/** Defines a filter that matches a range of values, such as prices or dates. */
export type FilterRangeTypeInput = {
  /** Use this attribute to specify the lowest possible value in the range. */
  from?: Maybe<Scalars['String']>;
  /** Use this attribute to specify the highest possible value in the range. */
  to?: Maybe<Scalars['String']>;
};

/** Defines a filter for an input string. */
export type FilterStringTypeInput = {
  /** Filters items that are exactly the same as the specified string. */
  eq?: Maybe<Scalars['String']>;
  /** Filters items that are exactly the same as entries specified in an array of strings. */
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Defines a filter that performs a fuzzy search using the specified string. */
  match?: Maybe<Scalars['String']>;
};

/** Defines the comparison operators that can be used in a filter. */
export type FilterTypeInput = {
  /** Equals. */
  eq?: Maybe<Scalars['String']>;
  finset?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** From. Must be used with the `to` field. */
  from?: Maybe<Scalars['String']>;
  /** Greater than. */
  gt?: Maybe<Scalars['String']>;
  /** Greater than or equal to. */
  gteq?: Maybe<Scalars['String']>;
  /** In. The value can contain a set of comma-separated values. */
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Like. The specified value can contain % (percent signs) to allow matching of 0 or more characters. */
  like?: Maybe<Scalars['String']>;
  /** Less than. */
  lt?: Maybe<Scalars['String']>;
  /** Less than or equal to. */
  lteq?: Maybe<Scalars['String']>;
  /** More than or equal to. */
  moreq?: Maybe<Scalars['String']>;
  /** Not equal to. */
  neq?: Maybe<Scalars['String']>;
  /** Not in. The value can contain a set of comma-separated values. */
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Not null. */
  notnull?: Maybe<Scalars['String']>;
  /** Is null. */
  null?: Maybe<Scalars['String']>;
  /** To. Must be used with the `from` field. */
  to?: Maybe<Scalars['String']>;
};

/** A single FPT that can be applied to a product price. */
export type FixedProductTax = {
  __typename?: 'FixedProductTax';
  /** The amount of the Fixed Product Tax. */
  amount?: Maybe<Money>;
  /** The display label assigned to the Fixed Product Tax. */
  label?: Maybe<Scalars['String']>;
};

/** Lists display settings for the Fixed Product Tax. */
export enum FixedProductTaxDisplaySettings {
  /** The displayed price includes the FPT amount without displaying the `ProductPrice.fixed_product_taxes` values. This value corresponds to 'Including FPT only'. */
  IncludeFptWithoutDetails = 'INCLUDE_FPT_WITHOUT_DETAILS',
  /** The displayed price includes the FPT amount while displaying the values of `ProductPrice.fixed_product_taxes` separately. This value corresponds to 'Including FPT and FPT description'. */
  IncludeFptWithDetails = 'INCLUDE_FPT_WITH_DETAILS',
  /** The displayed price does not include the FPT amount. The values of `ProductPrice.fixed_product_taxes` and the price including the FPT are displayed separately. This value corresponds to 'Excluding FPT, Including FPT description and final price.' */
  ExcludeFptAndIncludeWithDetails = 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS',
  /** The displayed price does not include the FPT amount. The values from `ProductPrice.fixed_product_taxes` are not displayed. This value corresponds to 'Excluding FPT'. */
  ExcludeFptWithoutDetails = 'EXCLUDE_FPT_WITHOUT_DETAILS',
  /** The FPT feature is not enabled. You can omit `ProductPrice.fixed_product_taxes` from your query. */
  FptDisabled = 'FPT_DISABLED'
}

export type Form = {
  __typename?: 'Form';
  /** Date Format */
  advanced_date_format?: Maybe<Scalars['String']>;
  /** Google Api Key used for Google Map Field */
  advanced_google_key?: Maybe<Scalars['String']>;
  /** The code of the custom form */
  code?: Maybe<Scalars['String']>;
  /** Date when custom form created */
  created_at?: Maybe<Scalars['String']>;
  /** Customer groups form displayed */
  customer_group?: Maybe<Scalars['String']>;
  /** Get email address of customer from selected field */
  email_field?: Maybe<Scalars['String']>;
  /** Hide Email field for logged in customer */
  email_field_hide?: Maybe<Scalars['Boolean']>;
  /** The ID number assigned to the custom form */
  form_id?: Maybe<Scalars['Int']>;
  /** Json contains all form fields */
  form_json?: Maybe<Scalars['String']>;
  /** Json with titles of pages */
  form_title?: Maybe<Scalars['String']>;
  /** Is GDPR consent enabled */
  gdpr_enabled?: Maybe<Scalars['Boolean']>;
  /** GDPR text */
  gdpr_text?: Maybe<Scalars['String']>;
  /** Is survey mode enabled */
  isSurvey?: Maybe<Scalars['Boolean']>;
  /** Survey is disabled or survey is enabled and form available */
  is_form_available?: Maybe<Scalars['Boolean']>;
  /** Text of button which trigger popup showing */
  popup_button?: Maybe<Scalars['String']>;
  /** Show custom form in popup */
  popup_show?: Maybe<Scalars['Boolean']>;
  /** If notifications need */
  send_notification?: Maybe<Scalars['Boolean']>;
  /** Send notifications to */
  send_to?: Maybe<Scalars['String']>;
  /** Status */
  status?: Maybe<Scalars['Boolean']>;
  /** Stores where form displayed */
  store_id?: Maybe<Scalars['String']>;
  /** Text of submit button */
  submit_button?: Maybe<Scalars['String']>;
  /** Message displayed after submit form */
  success_message?: Maybe<Scalars['String']>;
  /** Redirect url after submit */
  success_url?: Maybe<Scalars['String']>;
  /** The title of the custom form */
  title?: Maybe<Scalars['String']>;
};

export type GdprAnonymisePerformOutput = {
  __typename?: 'GdprAnonymisePerformOutput';
  error?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

/** Identifies which customer requires remote shopping assistance. */
export type GenerateCustomerTokenAsAdminInput = {
  /** The email address of the customer requesting remote shopping assistance. */
  customer_email: Scalars['String'];
};

/** Contains the generated customer token. */
export type GenerateCustomerTokenAsAdminOutput = {
  __typename?: 'GenerateCustomerTokenAsAdminOutput';
  /** The generated customer token. */
  customer_token: Scalars['String'];
};

export type GiftCardPriceValue = {
  __typename?: 'GiftCardPriceValue';
  currency?: Maybe<CurrencyEnum>;
  default?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** Contains the text of a gift message, its sender, and recipient */
export type GiftMessage = {
  __typename?: 'GiftMessage';
  /** Sender name */
  from: Scalars['String'];
  /** Gift message text */
  message: Scalars['String'];
  /** Recipient name */
  to: Scalars['String'];
};

/** Contains the text of a gift message, its sender, and recipient */
export type GiftMessageInput = {
  /** Sender name */
  from: Scalars['String'];
  /** Gift message text */
  message: Scalars['String'];
  /** Recipient name */
  to: Scalars['String'];
};

export type GoogleTagManagerScripts = {
  __typename?: 'GoogleTagManagerScripts';
  body?: Maybe<Scalars['String']>;
  footer?: Maybe<Scalars['String']>;
  head?: Maybe<Scalars['String']>;
};

/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProduct = ProductInterface & RoutableInterface & PhysicalProductInterface & {
  __typename?: 'GroupedProduct';
  /** Add to cart url. */
  add_to_cart_url?: Maybe<Scalars['String']>;
  /** Add to wishlist information. */
  add_to_wishlist?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  additional_features?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  assembly_type?: Maybe<Scalars['Int']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_colours?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_sizes?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  back_stock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  backstock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  barcode?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  base_slat_type?: Maybe<Scalars['Int']>;
  /** Custom data in bedkingdom website */
  bed_data?: Maybe<BedData>;
  /** @deprecated Use the `custom_attributes` field instead. */
  benifts?: Maybe<Scalars['String']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  chair_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  colour?: Maybe<Scalars['String']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  delivery?: Maybe<Scalars['Int']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dimentions?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dining_chairs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_drawers?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_fabric?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  exchange_return_upgrade?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  feet_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  filling_type_search?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  fold_mechanism?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  free_delivery?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  furniture_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ggiftcard_amount_config?: Maybe<Scalars['String']>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gtin?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  guarantee?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  headboard_included?: Maybe<Scalars['Int']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** An array containing grouped product items. */
  items?: Maybe<Array<Maybe<GroupedProductItem>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ladder?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  leg_diameter?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  length?: Maybe<Scalars['String']>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  matching_headboard?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  material_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_bundle?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_depth?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_tention?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_turn?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_type?: Maybe<Scalars['Int']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mpn?: Maybe<Scalars['String']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  nocupboards?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  number_of_springs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  numberdrawers?: Maybe<Scalars['Int']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  optional_extras?: Maybe<Scalars['Int']>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Product url. */
  product_url?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ranges?: Maybe<Scalars['Int']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  room_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  seat_type?: Maybe<Scalars['Int']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  size?: Maybe<Scalars['Int']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  split?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type_search?: Maybe<Scalars['Int']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  stompa_colours?: Maybe<Scalars['Int']>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_top_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  temperature_control_fabric?: Maybe<Scalars['Int']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  top_bunk_size?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_options?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_size?: Maybe<Scalars['Int']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  udropship_vendor?: Maybe<Scalars['Int']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  wardrobe_doors?: Maybe<Scalars['Int']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']>;
};


/** Defines a grouped product, which consists of simple standalone products that are presented as a group. */
export type GroupedProductReviewsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

/** Contains information about an individual grouped product item. */
export type GroupedProductItem = {
  __typename?: 'GroupedProductItem';
  /** The relative position of this item compared to the other group items. */
  position?: Maybe<Scalars['Int']>;
  /** Details about this product option. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this grouped product item. */
  qty?: Maybe<Scalars['Float']>;
};

/** A grouped product wish list item. */
export type GroupedProductWishlistItem = WishlistItemInterface & {
  __typename?: 'GroupedProductWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float'];
};

/** Contains a set of relative URLs that PayPal uses in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Payments Pro Hosted Solution payment method. */
export type HostedProInput = {
  /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. For example, if the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
  cancel_url: Scalars['String'];
  /** The relative URL of the final confirmation page that PayPal redirects to upon payment success. For example, if the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
  return_url: Scalars['String'];
};

/** Contains the secure URL used for the Payments Pro Hosted Solution payment method. */
export type HostedProUrl = {
  __typename?: 'HostedProUrl';
  /** The secure URL generated by PayPal. */
  secure_form_url?: Maybe<Scalars['String']>;
};

/** Contains the required input to request the secure URL for Payments Pro Hosted Solution payment. */
export type HostedProUrlInput = {
  /** The unique ID that identifies the shopper's cart. */
  cart_id: Scalars['String'];
};

/** Contains target path parameters. */
export type HttpQueryParameter = {
  __typename?: 'HttpQueryParameter';
  /** A parameter name. */
  name?: Maybe<Scalars['String']>;
  /** A parameter value. */
  value?: Maybe<Scalars['String']>;
};

export type ImageDetail = {
  __typename?: 'ImageDetail';
  height?: Maybe<Scalars['String']>;
  img?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['String']>;
};

export type ImageSwatchData = SwatchDataInterface & {
  __typename?: 'ImageSwatchData';
  /** The URL assigned to the thumbnail of the swatch image. */
  thumbnail?: Maybe<Scalars['String']>;
  /** The value can be represented as color (HEX code), image link, or text. */
  value?: Maybe<Scalars['String']>;
};

/** Contains an error message when an internal error occurred. */
export type InternalError = ErrorInterface & {
  __typename?: 'InternalError';
  /** The returned error message. */
  message: Scalars['String'];
};

/** Contains invoice details. */
export type Invoice = {
  __typename?: 'Invoice';
  /** Comments on the invoice. */
  comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
  /** The unique ID for a `Invoice` object. */
  id: Scalars['ID'];
  /** Invoiced product details. */
  items?: Maybe<Array<Maybe<InvoiceItemInterface>>>;
  /** Sequential invoice number. */
  number: Scalars['String'];
  /** Invoice total amount details. */
  total?: Maybe<InvoiceTotal>;
};

export type InvoiceItem = InvoiceItemInterface & {
  __typename?: 'InvoiceItem';
  /** Information about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for an `InvoiceItemInterface` object. */
  id: Scalars['ID'];
  /** Details about an individual order item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']>;
};

/** Contains detailes about invoiced items. */
export type InvoiceItemInterface = {
  /** Information about the final discount amount for the base product, including discounts on options. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The unique ID for an `InvoiceItemInterface` object. */
  id: Scalars['ID'];
  /** Details about an individual order item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']>;
};

/** Contains price details from an invoice. */
export type InvoiceTotal = {
  __typename?: 'InvoiceTotal';
  /** The final base grand total amount in the base currency. */
  base_grand_total: Money;
  /** The applied discounts to the invoice. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The final total amount, including shipping, discounts, and taxes. */
  grand_total: Money;
  /** Details about the shipping and handling costs for the invoice. */
  shipping_handling?: Maybe<ShippingHandling>;
  /** The subtotal of the invoice, excluding shipping, discounts, and taxes. */
  subtotal: Money;
  /** The invoice tax details. */
  taxes?: Maybe<Array<Maybe<TaxItem>>>;
  /** The shipping amount for the invoice. */
  total_shipping: Money;
  /** The amount of tax applied to the invoice. */
  total_tax: Money;
};

/** Contains the result of the `isEmailAvailable` query. */
export type IsEmailAvailableOutput = {
  __typename?: 'IsEmailAvailableOutput';
  /** Indicates whether the specified email address can be used to create a customer. */
  is_email_available?: Maybe<Scalars['Boolean']>;
};

/** A list of options of the selected bundle product. */
export type ItemSelectedBundleOption = {
  __typename?: 'ItemSelectedBundleOption';
  /**
   * The unique ID for a `ItemSelectedBundleOption` object.
   * @deprecated Use `uid` instead.
   */
  id: Scalars['ID'];
  /** The label of the option. */
  label: Scalars['String'];
  /** The unique ID for a `ItemSelectedBundleOption` object. */
  uid: Scalars['ID'];
  /** A list of products that represent the values of the parent option. */
  values?: Maybe<Array<Maybe<ItemSelectedBundleOptionValue>>>;
};

/** A list of values for the selected bundle product. */
export type ItemSelectedBundleOptionValue = {
  __typename?: 'ItemSelectedBundleOptionValue';
  /**
   * The unique ID for a `ItemSelectedBundleOptionValue` object.
   * @deprecated Use `uid` instead.
   */
  id: Scalars['ID'];
  /** The price of the child bundle product. */
  price: Money;
  /** The name of the child bundle product. */
  product_name: Scalars['String'];
  /** The SKU of the child bundle product. */
  product_sku: Scalars['String'];
  /** The number of this bundle product that were ordered. */
  quantity: Scalars['Float'];
  /** The unique ID for a `ItemSelectedBundleOptionValue` object. */
  uid: Scalars['ID'];
};

/** Contains a key-value pair. */
export type KeyValue = {
  __typename?: 'KeyValue';
  /** The name part of the key/value pair. */
  name?: Maybe<Scalars['String']>;
  /** The value part of the key/value pair. */
  value?: Maybe<Scalars['String']>;
};

export type KlarnaInput = {
  /** The authorization token must be provided to set any Klarna Payments method */
  authorization_token: Scalars['String'];
};

export type Landing = RoutableInterface & {
  __typename?: 'Landing';
  /** Landing conditions. */
  conditions_serialized?: Maybe<Scalars['String']>;
  /** Landing creation time. */
  creation_time?: Maybe<Scalars['String']>;
  /** Default Product Listing Sort By. */
  default_sort_by?: Maybe<Scalars['String']>;
  /** Landing dynamic category id. */
  dynamic_category_id?: Maybe<Scalars['Int']>;
  /** Landing dynamic category url. */
  dynamic_category_url?: Maybe<Scalars['String']>;
  /** Landing identifier. */
  identifier?: Maybe<Scalars['String']>;
  /** Landing is active. */
  is_active?: Maybe<Scalars['Int']>;
  /** Landing bottom description. */
  layout_bottom_description?: Maybe<Scalars['String']>;
  /** Landing columns count. */
  layout_columns_count?: Maybe<Scalars['Int']>;
  /** Landing image. */
  layout_file?: Maybe<Scalars['String']>;
  /** Landing image alt. */
  layout_file_alt?: Maybe<Scalars['String']>;
  /** Landing layout heading. */
  layout_heading?: Maybe<Scalars['String']>;
  /** Landing include navigation. */
  layout_include_navigation?: Maybe<Scalars['Boolean']>;
  /** Landing bottom static block. */
  layout_static_bottom?: Maybe<Scalars['String']>;
  /** Landing top static block. */
  layout_static_top?: Maybe<Scalars['String']>;
  /** Landing top description. */
  layout_top_description?: Maybe<Scalars['String']>;
  /** Layout Update XML. */
  layout_update_xml?: Maybe<Scalars['String']>;
  /** Landing meta data. */
  meta_data?: Maybe<Scalars['String']>;
  /** Landing id. */
  page_id?: Maybe<Scalars['Int']>;
  /** Landing layout. */
  page_layout?: Maybe<Scalars['String']>;
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** Landing sort order. */
  sort_order?: Maybe<Scalars['String']>;
  /** Landing store ids. */
  store_id?: Maybe<Array<Maybe<Scalars['Int']>>>;
  /** Landing title. */
  title?: Maybe<Scalars['String']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /** Landing last update time. */
  update_time?: Maybe<Scalars['String']>;
};

/** Contains information for rendering layered navigation. */
export type LayerFilter = {
  __typename?: 'LayerFilter';
  /**
   * An array of filter items.
   * @deprecated Use `Aggregation.options` instead.
   */
  filter_items?: Maybe<Array<Maybe<LayerFilterItemInterface>>>;
  /**
   * The count of filter items in filter group.
   * @deprecated Use `Aggregation.count` instead.
   */
  filter_items_count?: Maybe<Scalars['Int']>;
  /**
   * The name of a layered navigation filter.
   * @deprecated Use `Aggregation.label` instead.
   */
  name?: Maybe<Scalars['String']>;
  /**
   * The request variable name for a filter query.
   * @deprecated Use `Aggregation.attribute_code` instead.
   */
  request_var?: Maybe<Scalars['String']>;
};

export type LayerFilterItem = LayerFilterItemInterface & {
  __typename?: 'LayerFilterItem';
  /**
   * The count of items per filter.
   * @deprecated Use `AggregationOption.count` instead.
   */
  items_count?: Maybe<Scalars['Int']>;
  /**
   * The label for a filter.
   * @deprecated Use `AggregationOption.label` instead.
   */
  label?: Maybe<Scalars['String']>;
  /**
   * The value of a filter request variable to be used in query.
   * @deprecated Use `AggregationOption.value` instead.
   */
  value_string?: Maybe<Scalars['String']>;
};

export type LayerFilterItemInterface = {
  /**
   * The count of items per filter.
   * @deprecated Use `AggregationOption.count` instead.
   */
  items_count?: Maybe<Scalars['Int']>;
  /**
   * The label for a filter.
   * @deprecated Use `AggregationOption.label` instead.
   */
  label?: Maybe<Scalars['String']>;
  /**
   * The value of a filter request variable to be used in query.
   * @deprecated Use `AggregationOption.value` instead.
   */
  value_string?: Maybe<Scalars['String']>;
};

export type MagefanBlogPost = {
  __typename?: 'MagefanBlogPost';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type MageplazaBlogPost = {
  __typename?: 'MageplazaBlogPost';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** Defines characteristics about images and videos associated with a specific product. */
export type MediaGalleryEntry = {
  __typename?: 'MediaGalleryEntry';
  /** Details about the content of the media gallery item. */
  content?: Maybe<ProductMediaGalleryEntriesContent>;
  /** Indicates whether the image is hidden from view. */
  disabled?: Maybe<Scalars['Boolean']>;
  /** The path of the image on the server. */
  file?: Maybe<Scalars['String']>;
  /**
   * The identifier assigned to the object.
   * @deprecated Use `uid` instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The alt text displayed on the storefront when the user points to the image. */
  label?: Maybe<Scalars['String']>;
  /** Either `image` or `video`. */
  media_type?: Maybe<Scalars['String']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']>;
  /** Array of image types. It can have the following values: image, small_image, thumbnail. */
  types?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The unique ID for a `MediaGalleryEntry` object. */
  uid: Scalars['ID'];
  /** Details about the content of a video item. */
  video_content?: Maybe<ProductMediaGalleryEntriesVideoContent>;
};

/** Contains basic information about a product image or video. */
export type MediaGalleryInterface = {
  /** Indicates whether the image is hidden from view. */
  disabled?: Maybe<Scalars['Boolean']>;
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']>;
};

export type MegamenuItemsOutput = {
  __typename?: 'MegamenuItemsOutput';
  after_html?: Maybe<Scalars['String']>;
  align?: Maybe<Scalars['String']>;
  animation_in?: Maybe<Scalars['String']>;
  animation_time?: Maybe<Scalars['String']>;
  before_html?: Maybe<Scalars['String']>;
  bg_color?: Maybe<Scalars['String']>;
  bg_hover_color?: Maybe<Scalars['String']>;
  caret?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  child_col?: Maybe<Scalars['String']>;
  child_col_type?: Maybe<Scalars['String']>;
  children?: Maybe<Array<Maybe<MegamenuItemsOutput>>>;
  classes?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  content_html?: Maybe<Scalars['String']>;
  content_type?: Maybe<Scalars['String']>;
  content_width?: Maybe<Scalars['String']>;
  disable_bellow?: Maybe<Scalars['String']>;
  dropdown_bgcolor?: Maybe<Scalars['String']>;
  dropdown_bgimage?: Maybe<Scalars['String']>;
  dropdown_bgimagerepeat?: Maybe<Scalars['String']>;
  dropdown_bgpositionx?: Maybe<Scalars['String']>;
  dropdown_bgpositiony?: Maybe<Scalars['String']>;
  dropdown_inlinecss?: Maybe<Scalars['String']>;
  footer_html?: Maybe<Scalars['String']>;
  header_html?: Maybe<Scalars['String']>;
  hover_caret?: Maybe<Scalars['String']>;
  hover_color?: Maybe<Scalars['String']>;
  hover_icon?: Maybe<Scalars['String']>;
  htmlId?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  icon_classes?: Maybe<Scalars['String']>;
  icon_position?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  inline_css?: Maybe<Scalars['String']>;
  is_group?: Maybe<Scalars['String']>;
  isgroup_level?: Maybe<Scalars['String']>;
  item_id?: Maybe<Scalars['String']>;
  left_sidebar_html?: Maybe<Scalars['String']>;
  left_sidebar_width?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  link_type?: Maybe<Scalars['String']>;
  menu_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parentcat?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  right_sidebar_html?: Maybe<Scalars['String']>;
  right_sidebar_width?: Maybe<Scalars['String']>;
  show_content?: Maybe<Scalars['String']>;
  show_footer?: Maybe<Scalars['String']>;
  show_header?: Maybe<Scalars['String']>;
  show_icon?: Maybe<Scalars['String']>;
  show_left_sidebar?: Maybe<Scalars['String']>;
  show_name?: Maybe<Scalars['String']>;
  show_right_sidebar?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  sub_height?: Maybe<Scalars['String']>;
  sub_width?: Maybe<Scalars['String']>;
  submenu_sorttype?: Maybe<Scalars['String']>;
  tab_position?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
  url_key?: Maybe<Scalars['String']>;
  url_path?: Maybe<Scalars['String']>;
};

export type MirasvitKbArticle = {
  __typename?: 'MirasvitKbArticle';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** Defines a monetary value, including a numeric value and a currency code. */
export type Money = {
  __typename?: 'Money';
  /** A three-letter currency code, such as USD or EUR. */
  currency?: Maybe<CurrencyEnum>;
  /** A number expressing a monetary value. */
  value?: Maybe<Scalars['Float']>;
};

export type MoreFromBrand = {
  __typename?: 'MoreFromBrand';
  /** An array of products */
  items?: Maybe<Array<Maybe<ProductInterface>>>;
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Leave a comment to the post */
  AmBlogLeaveComment?: Maybe<AmBlogLeaveCommentOutput>;
  /** Leave a vote to the post */
  AmBlogLeaveVote?: Maybe<AmBlogLeaveVoteOutput>;
  /** Add gift card account to customer's account */
  addAmGiftCardCodeToAccount?: Maybe<AmGiftCardMutationCommonOutput>;
  /** Add gift card product to specified cart */
  addAmGiftCardProductsToCart?: Maybe<AddAmGiftCardProductsToCartOutput>;
  /** Add one or more bundle products to the specified cart. We recommend using `addProductsToCart` instead. */
  addBundleProductsToCart?: Maybe<AddBundleProductsToCartOutput>;
  /** Add one or more configurable products to the specified cart. We recommend using `addProductsToCart` instead. */
  addConfigurableProductsToCart?: Maybe<AddConfigurableProductsToCartOutput>;
  /** Add one or more downloadable products to the specified cart. We recommend using `addProductsToCart` instead. */
  addDownloadableProductsToCart?: Maybe<AddDownloadableProductsToCartOutput>;
  addProductQuestion?: Maybe<ProductQuestionOutput>;
  /** Add any type of product to the cart */
  addProductsToCart?: Maybe<AddProductsToCartOutput>;
  /** Add products to the specified compare list. */
  addProductsToCompareList?: Maybe<CompareList>;
  /** Add one or more products to the specified wish list. This mutation supports all product types. */
  addProductsToWishlist?: Maybe<AddProductsToWishlistOutput>;
  /** Add one or more simple products to the specified cart. We recommend using `addProductsToCart` instead. */
  addSimpleProductsToCart?: Maybe<AddSimpleProductsToCartOutput>;
  /** Add one or more virtual products to the specified cart. We recommend using `addProductsToCart` instead. */
  addVirtualProductsToCart?: Maybe<AddVirtualProductsToCartOutput>;
  /** Add items in the specified wishlist to the customer's cart. */
  addWishlistItemsToCart?: Maybe<AddWishlistItemsToCartOutput>;
  /** Submit form */
  amCustomFormSubmit?: Maybe<AmFormSubmitOutput>;
  /** Apply a gift card code to the specified cart */
  applyAmGiftCardToCart?: Maybe<ApplyAmGiftCardToCartOutput>;
  applyAndReplaceCouponToCart?: Maybe<ApplyCouponToCartOutput>;
  /** Apply a pre-defined coupon code to the specified cart. */
  applyCouponToCart?: Maybe<ApplyCouponToCartOutput>;
  /** Assign the specified compare list to the logged in customer. */
  assignCompareListToCustomer?: Maybe<AssignCompareListToCustomerOutput>;
  /** Assign a logged-in customer to the specified guest shopping cart. */
  assignCustomerToGuestCart: Cart;
  /** Change the password for the logged-in customer. */
  changeCustomerPassword?: Maybe<Customer>;
  /** Complete Checkout Session */
  completeCheckoutSession?: Maybe<CompleteCheckoutSessionOutput>;
  contactSubmit?: Maybe<ContactSubmitOutput>;
  /** Creates an Clearpay Checkout. */
  createClearpayCheckout?: Maybe<CreateClearpayCheckoutOutput>;
  /** Create a new compare list. The compare list is saved for logged in customers. */
  createCompareList?: Maybe<CompareList>;
  /** Create customer account */
  createCustomer?: Maybe<CustomerOutput>;
  /** Create a billing or shipping address for a customer or guest. */
  createCustomerAddress?: Maybe<CustomerAddress>;
  /** Create customer account */
  createCustomerV2?: Maybe<CustomerOutput>;
  /** Create an empty shopping cart for a guest or logged in user */
  createEmptyCart?: Maybe<Scalars['String']>;
  /** Creates a Klarna Payments Session. */
  createKlarnaPaymentsSession?: Maybe<CreateKlarnaPaymentsSessionOutput>;
  /** Initiate a transaction and receive a token. Use this mutation for Payflow Pro and Payments Pro payment methods */
  createPayflowProToken?: Maybe<CreatePayflowProTokenOutput>;
  /** Initiate an Express Checkout transaction and receive a token. Use this mutation for Express Checkout and Payments Standard payment methods. */
  createPaypalExpressToken?: Maybe<PaypalExpressTokenOutput>;
  /** Create a product review for the specified product. */
  createProductReview: CreateProductReviewOutput;
  /** Delete the specified compare list. */
  deleteCompareList?: Maybe<DeleteCompareListOutput>;
  /** Delete the billing or shipping address of a customer. */
  deleteCustomerAddress?: Maybe<Scalars['Boolean']>;
  /** Delete a customer's payment token. */
  deletePaymentToken?: Maybe<DeletePaymentTokenOutput>;
  gdprAnonymisePerform?: Maybe<GdprAnonymisePerformOutput>;
  /** Generate a token for specified customer. */
  generateCustomerToken?: Maybe<CustomerToken>;
  /** Request a customer token so that an administrator can perform remote shopping assistance. */
  generateCustomerTokenAsAdmin?: Maybe<GenerateCustomerTokenAsAdminOutput>;
  /** Handle a payment response and save the payment in Quote. Use this mutation for Payflow Pro and Payments Pro payment methods. */
  handlePayflowProResponse?: Maybe<PayflowProResponseOutput>;
  /** Transfer the contents of a guest cart into the cart of a logged-in customer. */
  mergeCarts: Cart;
  /** Convert the quote into an order. */
  placeOrder?: Maybe<PlaceOrderOutput>;
  /** Remove gift card account from customer's account */
  removeAmGiftCardCodeToAccount?: Maybe<AmGiftCardMutationCommonOutput>;
  /** Remove a gift card code from the specified cart */
  removeAmGiftCardFromCart?: Maybe<RemoveAmGiftCardFromCartOutput>;
  /** Remove a previously-applied coupon from the cart. The cart must contain at least one item in order to remove the coupon. */
  removeCouponFromCart?: Maybe<RemoveCouponFromCartOutput>;
  /** Delete the entire quantity of a specified item from the cart. If you remove all items from the cart, the cart continues to exist. */
  removeItemFromCart?: Maybe<RemoveItemFromCartOutput>;
  removeItemsFromCart?: Maybe<RemoveItemFromCartOutput>;
  /** Remove products from the specified compare list. */
  removeProductsFromCompareList?: Maybe<CompareList>;
  /** Remove one or more products from the specified wish list. */
  removeProductsFromWishlist?: Maybe<RemoveProductsFromWishlistOutput>;
  /** Add all products from a customer's previous order to the cart. */
  reorderItems?: Maybe<ReorderItemsOutput>;
  /** Request an email with a reset password token for the registered customer identified by the specified email. */
  requestPasswordResetEmail?: Maybe<Scalars['Boolean']>;
  /** Reset a customer's password using the reset password token that the customer received in an email after requesting it using `requestPasswordResetEmail`. */
  resetPassword?: Maybe<Scalars['Boolean']>;
  /** Revoke the customer token. */
  revokeCustomerToken?: Maybe<RevokeCustomerTokenOutput>;
  saveChiakiConfig?: Maybe<ChiakiConfig>;
  /** Send a message on behalf of a customer to the specified email addresses. */
  sendEmailToFriend?: Maybe<SendEmailToFriendOutput>;
  /** Set the billing address on a specific cart. */
  setBillingAddressOnCart?: Maybe<SetBillingAddressOnCartOutput>;
  /** Set Customer Link */
  setCustomerLink?: Maybe<SetCustomerLinkOutput>;
  /** Assign the email address of a guest to the cart. */
  setGuestEmailOnCart?: Maybe<SetGuestEmailOnCartOutput>;
  /**
   * Set the cart payment method and convert the cart into an order.
   * @deprecated Should use setPaymentMethodOnCart and placeOrder mutations in single request.
   */
  setPaymentMethodAndPlaceOrder?: Maybe<PlaceOrderOutput>;
  /** Apply a payment method to the cart. */
  setPaymentMethodOnCart?: Maybe<SetPaymentMethodOnCartOutput>;
  /** Set one or more shipping addresses on a specific cart. */
  setShippingAddressesOnCart?: Maybe<SetShippingAddressesOnCartOutput>;
  /** Set one or more delivery methods on a cart. */
  setShippingMethodsOnCart?: Maybe<SetShippingMethodsOnCartOutput>;
  /** Subscribe the specified email to the store's newsletter. */
  subscribeEmailToNewsletter?: Maybe<SubscribeEmailToNewsletterOutput>;
  /** Modify items in the cart. */
  updateCartItems?: Maybe<UpdateCartItemsOutput>;
  /** Update Checkout Session */
  updateCheckoutSession?: Maybe<UpdateCheckoutSessionOutput>;
  /** Use `updateCustomerV2` instead. */
  updateCustomer?: Maybe<CustomerOutput>;
  /** Update the billing or shipping address of a customer or guest. */
  updateCustomerAddress?: Maybe<CustomerAddress>;
  /** Change the email address for the logged-in customer. */
  updateCustomerEmail?: Maybe<CustomerOutput>;
  /** Update the customer's personal information. */
  updateCustomerV2?: Maybe<CustomerOutput>;
  /** Update one or more products in the specified wish list. */
  updateProductsInWishlist?: Maybe<UpdateProductsInWishlistOutput>;
  xnotifStock?: Maybe<Scalars['String']>;
};


export type MutationAmBlogLeaveCommentArgs = {
  input?: Maybe<AmBlogLeaveCommentInput>;
};


export type MutationAmBlogLeaveVoteArgs = {
  input?: Maybe<AmBlogLeaveVoteInput>;
};


export type MutationAddAmGiftCardCodeToAccountArgs = {
  input?: Maybe<AmGiftCardCodeInAccountInput>;
};


export type MutationAddAmGiftCardProductsToCartArgs = {
  input?: Maybe<AddAmGiftCardProductsToCartInput>;
};


export type MutationAddBundleProductsToCartArgs = {
  input?: Maybe<AddBundleProductsToCartInput>;
};


export type MutationAddConfigurableProductsToCartArgs = {
  input?: Maybe<AddConfigurableProductsToCartInput>;
};


export type MutationAddDownloadableProductsToCartArgs = {
  input?: Maybe<AddDownloadableProductsToCartInput>;
};


export type MutationAddProductQuestionArgs = {
  input?: Maybe<ProductQuestionInput>;
};


export type MutationAddProductsToCartArgs = {
  cartId: Scalars['String'];
  cartItems: Array<CartItemInput>;
};


export type MutationAddProductsToCompareListArgs = {
  input?: Maybe<AddProductsToCompareListInput>;
};


export type MutationAddProductsToWishlistArgs = {
  wishlistId: Scalars['ID'];
  wishlistItems: Array<WishlistItemInput>;
};


export type MutationAddSimpleProductsToCartArgs = {
  input?: Maybe<AddSimpleProductsToCartInput>;
};


export type MutationAddVirtualProductsToCartArgs = {
  input?: Maybe<AddVirtualProductsToCartInput>;
};


export type MutationAddWishlistItemsToCartArgs = {
  wishlistId: Scalars['ID'];
  wishlistItemIds?: Maybe<Array<Scalars['ID']>>;
};


export type MutationAmCustomFormSubmitArgs = {
  input?: Maybe<AmFormSubmitInput>;
};


export type MutationApplyAmGiftCardToCartArgs = {
  input?: Maybe<ApplyAmGiftCardToCartInput>;
};


export type MutationApplyAndReplaceCouponToCartArgs = {
  input?: Maybe<ApplyCouponToCartInput>;
};


export type MutationApplyCouponToCartArgs = {
  input?: Maybe<ApplyCouponToCartInput>;
};


export type MutationAssignCompareListToCustomerArgs = {
  uid: Scalars['ID'];
};


export type MutationAssignCustomerToGuestCartArgs = {
  cart_id: Scalars['String'];
};


export type MutationChangeCustomerPasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCompleteCheckoutSessionArgs = {
  cartId: Scalars['String'];
  amazonSessionId: Scalars['String'];
};


export type MutationContactSubmitArgs = {
  input?: Maybe<ContactSubmitInput>;
};


export type MutationCreateClearpayCheckoutArgs = {
  input?: Maybe<CreateClearpayCheckoutInput>;
};


export type MutationCreateCompareListArgs = {
  input?: Maybe<CreateCompareListInput>;
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};


export type MutationCreateCustomerAddressArgs = {
  input: CustomerAddressInput;
};


export type MutationCreateCustomerV2Args = {
  input: CustomerCreateInput;
};


export type MutationCreateEmptyCartArgs = {
  input?: Maybe<CreateEmptyCartInput>;
};


export type MutationCreateKlarnaPaymentsSessionArgs = {
  input?: Maybe<CreateKlarnaPaymentsSessionInput>;
};


export type MutationCreatePayflowProTokenArgs = {
  input: PayflowProTokenInput;
};


export type MutationCreatePaypalExpressTokenArgs = {
  input: PaypalExpressTokenInput;
};


export type MutationCreateProductReviewArgs = {
  input: CreateProductReviewInput;
};


export type MutationDeleteCompareListArgs = {
  uid: Scalars['ID'];
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePaymentTokenArgs = {
  public_hash: Scalars['String'];
};


export type MutationGenerateCustomerTokenArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationGenerateCustomerTokenAsAdminArgs = {
  input: GenerateCustomerTokenAsAdminInput;
};


export type MutationHandlePayflowProResponseArgs = {
  input: PayflowProResponseInput;
};


export type MutationMergeCartsArgs = {
  source_cart_id: Scalars['String'];
  destination_cart_id?: Maybe<Scalars['String']>;
};


export type MutationPlaceOrderArgs = {
  input?: Maybe<PlaceOrderInput>;
};


export type MutationRemoveAmGiftCardCodeToAccountArgs = {
  input?: Maybe<AmGiftCardCodeInAccountInput>;
};


export type MutationRemoveAmGiftCardFromCartArgs = {
  input?: Maybe<RemoveAmGiftCardFromCartInput>;
};


export type MutationRemoveCouponFromCartArgs = {
  input?: Maybe<RemoveCouponFromCartInput>;
};


export type MutationRemoveItemFromCartArgs = {
  input?: Maybe<RemoveItemFromCartInput>;
};


export type MutationRemoveItemsFromCartArgs = {
  input?: Maybe<RemoveItemsFromCartInput>;
};


export type MutationRemoveProductsFromCompareListArgs = {
  input?: Maybe<RemoveProductsFromCompareListInput>;
};


export type MutationRemoveProductsFromWishlistArgs = {
  wishlistId: Scalars['ID'];
  wishlistItemsIds: Array<Scalars['ID']>;
};


export type MutationReorderItemsArgs = {
  orderNumber: Scalars['String'];
};


export type MutationRequestPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
  resetPasswordToken: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationSaveChiakiConfigArgs = {
  input?: Maybe<ChiakiInput>;
};


export type MutationSendEmailToFriendArgs = {
  input?: Maybe<SendEmailToFriendInput>;
};


export type MutationSetBillingAddressOnCartArgs = {
  input?: Maybe<SetBillingAddressOnCartInput>;
};


export type MutationSetCustomerLinkArgs = {
  buyerToken: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSetGuestEmailOnCartArgs = {
  input?: Maybe<SetGuestEmailOnCartInput>;
};


export type MutationSetPaymentMethodAndPlaceOrderArgs = {
  input?: Maybe<SetPaymentMethodAndPlaceOrderInput>;
};


export type MutationSetPaymentMethodOnCartArgs = {
  input?: Maybe<SetPaymentMethodOnCartInput>;
};


export type MutationSetShippingAddressesOnCartArgs = {
  input?: Maybe<SetShippingAddressesOnCartInput>;
};


export type MutationSetShippingMethodsOnCartArgs = {
  input?: Maybe<SetShippingMethodsOnCartInput>;
};


export type MutationSubscribeEmailToNewsletterArgs = {
  email: Scalars['String'];
};


export type MutationUpdateCartItemsArgs = {
  input?: Maybe<UpdateCartItemsInput>;
};


export type MutationUpdateCheckoutSessionArgs = {
  cartId: Scalars['String'];
  amazonSessionId: Scalars['String'];
};


export type MutationUpdateCustomerArgs = {
  input: CustomerInput;
};


export type MutationUpdateCustomerAddressArgs = {
  id: Scalars['Int'];
  input?: Maybe<CustomerAddressInput>;
};


export type MutationUpdateCustomerEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateCustomerV2Args = {
  input: CustomerUpdateInput;
};


export type MutationUpdateProductsInWishlistArgs = {
  wishlistId: Scalars['ID'];
  wishlistItems: Array<WishlistItemUpdateInput>;
};


export type MutationXnotifStockArgs = {
  input?: Maybe<XnotifInput>;
};

/** Contains an error message when an invalid UID was specified. */
export type NoSuchEntityUidError = ErrorInterface & {
  __typename?: 'NoSuchEntityUidError';
  /** The returned error message. */
  message: Scalars['String'];
  /** The specified invalid unique ID of an object. */
  uid: Scalars['ID'];
};

/** Contains the order ID. */
export type Order = {
  __typename?: 'Order';
  /** @deprecated Use `order_number` instead. */
  order_id?: Maybe<Scalars['String']>;
  /** The unique ID for an `Order` object. */
  order_number: Scalars['String'];
};

/** Contains detailed information about an order's billing and shipping addresses. */
export type OrderAddress = {
  __typename?: 'OrderAddress';
  /** The city or town. */
  city: Scalars['String'];
  /** The customer's company. */
  company?: Maybe<Scalars['String']>;
  /** The customer's country. */
  country_code?: Maybe<CountryCodeEnum>;
  /** The fax number. */
  fax?: Maybe<Scalars['String']>;
  /** The first name of the person associated with the shipping/billing address. */
  firstname: Scalars['String'];
  /** The family name of the person associated with the shipping/billing address. */
  lastname: Scalars['String'];
  /** The middle name of the person associated with the shipping/billing address. */
  middlename?: Maybe<Scalars['String']>;
  /** The customer's ZIP or postal code. */
  postcode?: Maybe<Scalars['String']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']>;
  /** The state or province name. */
  region?: Maybe<Scalars['String']>;
  /** The unique ID for a `Region` object of a pre-defined region. */
  region_id?: Maybe<Scalars['ID']>;
  /** An array of strings that define the street number and name. */
  street: Array<Maybe<Scalars['String']>>;
  /** A value such as Sr., Jr., or III. */
  suffix?: Maybe<Scalars['String']>;
  /** The telephone number. */
  telephone?: Maybe<Scalars['String']>;
  /** The customer's Value-added tax (VAT) number (for corporate customers). */
  vat_id?: Maybe<Scalars['String']>;
};

export type OrderItem = OrderItemInterface & {
  __typename?: 'OrderItem';
  additional_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The final discount information for the product. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The entered option for the base product, such as a logo or image. */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The unique ID for an `OrderItemInterface` object. */
  id: Scalars['ID'];
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price of the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']>;
  /** URL key of the base product. */
  product_url_key?: Maybe<Scalars['String']>;
  /** The number of canceled items. */
  quantity_canceled?: Maybe<Scalars['Float']>;
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']>;
  /** The number of units ordered for this item. */
  quantity_ordered?: Maybe<Scalars['Float']>;
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']>;
  /** The number of returned items. */
  quantity_returned?: Maybe<Scalars['Float']>;
  /** The number of shipped items. */
  quantity_shipped?: Maybe<Scalars['Float']>;
  /** The selected options for the base product, such as color or size. */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item. */
  status?: Maybe<Scalars['String']>;
};

/** Order item details. */
export type OrderItemInterface = {
  additional_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The final discount information for the product. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The entered option for the base product, such as a logo or image. */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The unique ID for an `OrderItemInterface` object. */
  id: Scalars['ID'];
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price of the base product, including selected options. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']>;
  /** URL key of the base product. */
  product_url_key?: Maybe<Scalars['String']>;
  /** The number of canceled items. */
  quantity_canceled?: Maybe<Scalars['Float']>;
  /** The number of invoiced items. */
  quantity_invoiced?: Maybe<Scalars['Float']>;
  /** The number of units ordered for this item. */
  quantity_ordered?: Maybe<Scalars['Float']>;
  /** The number of refunded items. */
  quantity_refunded?: Maybe<Scalars['Float']>;
  /** The number of returned items. */
  quantity_returned?: Maybe<Scalars['Float']>;
  /** The number of shipped items. */
  quantity_shipped?: Maybe<Scalars['Float']>;
  /** The selected options for the base product, such as color or size. */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item. */
  status?: Maybe<Scalars['String']>;
};

/** Represents order item options like selected or entered. */
export type OrderItemOption = {
  __typename?: 'OrderItemOption';
  /** The name of the option. */
  label: Scalars['String'];
  /** The value of the option. */
  value: Scalars['String'];
};

/** Contains details about the payment method used to pay for the order. */
export type OrderPaymentMethod = {
  __typename?: 'OrderPaymentMethod';
  /** Additional data per payment method type. */
  additional_data?: Maybe<Array<Maybe<KeyValue>>>;
  /** The label that describes the payment method. */
  name: Scalars['String'];
  /** The payment method code that indicates how the order was paid for. */
  type: Scalars['String'];
};

/** Contains order shipment details. */
export type OrderShipment = {
  __typename?: 'OrderShipment';
  /** Comments added to the shipment. */
  comments?: Maybe<Array<Maybe<SalesCommentItem>>>;
  /** The unique ID for a `OrderShipment` object. */
  id: Scalars['ID'];
  /** An array of items included in the shipment. */
  items?: Maybe<Array<Maybe<ShipmentItemInterface>>>;
  /** The sequential credit shipment number. */
  number: Scalars['String'];
  /** An array of shipment tracking details. */
  tracking?: Maybe<Array<Maybe<ShipmentTracking>>>;
};

/** Contains details about the sales total amounts used to calculate the final price. */
export type OrderTotal = {
  __typename?: 'OrderTotal';
  /** The final base grand total amount in the base currency. */
  base_grand_total: Money;
  /** The applied discounts to the order. */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The final total amount, including shipping, discounts, and taxes. */
  grand_total: Money;
  /** Details about the shipping and handling costs for the order. */
  shipping_handling?: Maybe<ShippingHandling>;
  /** The subtotal of the order, excluding shipping, discounts, and taxes. */
  subtotal: Money;
  /** The order tax details. */
  taxes?: Maybe<Array<Maybe<TaxItem>>>;
  /** The shipping amount for the order. */
  total_shipping: Money;
  /** The amount of tax applied to the order. */
  total_tax: Money;
};

export type OwlCarouselSliderOutput = {
  __typename?: 'OwlCarouselSliderOutput';
  /** Banner Config */
  banner_config?: Maybe<Array<Maybe<BannerConfig>>>;
  /** Breakpoint Config */
  breakpoint_config?: Maybe<BreakpointConfig>;
  /** Is gat Enable */
  is_gat_enabled?: Maybe<Scalars['String']>;
  /** Media Url */
  media_url?: Maybe<Scalars['String']>;
  /** Slider Config */
  slider_config?: Maybe<SliderConfig>;
  slider_id?: Maybe<Scalars['Int']>;
};

export enum PageTypeEnum {
  Category = 'CATEGORY',
  Search = 'SEARCH'
}

/** Contains required input for Payflow Express Checkout payments. */
export type PayflowExpressInput = {
  /** The unique ID of the PayPal user. */
  payer_id: Scalars['String'];
  /** The token returned by the createPaypalExpressToken mutation. */
  token: Scalars['String'];
};

/** A set of relative URLs that PayPal uses in response to various actions during the authorization process. Adobe Commerce prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkInput = {
  /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
  cancel_url: Scalars['String'];
  /** The relative URL of the transaction error page that PayPal redirects to upon payment error. If the full URL to this page is https://www.example.com/paypal/action/error.html, the relative URL is paypal/action/error.html. */
  error_url: Scalars['String'];
  /** The relative URL of the order confirmation page that PayPal redirects to when the payment is successful and additional confirmation is not needed. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
  return_url: Scalars['String'];
};

/** Indicates the mode for payment. Applies to the Payflow Link and Payments Advanced payment methods. */
export enum PayflowLinkMode {
  Test = 'TEST',
  Live = 'LIVE'
}

/** Contains information used to generate PayPal iframe for transaction. Applies to Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkToken = {
  __typename?: 'PayflowLinkToken';
  /** The mode for the Payflow transaction. */
  mode?: Maybe<PayflowLinkMode>;
  /** The PayPal URL used for requesting a Payflow form. */
  paypal_url?: Maybe<Scalars['String']>;
  /** The secure token generated by PayPal. */
  secure_token?: Maybe<Scalars['String']>;
  /** The secure token ID generated by PayPal. */
  secure_token_id?: Maybe<Scalars['String']>;
};

/** Contains information required to fetch payment token information for the Payflow Link and Payments Advanced payment methods. */
export type PayflowLinkTokenInput = {
  /** The unique ID that identifies the customer's cart. */
  cart_id: Scalars['String'];
};

/** Contains input for the Payflow Pro and Payments Pro payment methods. */
export type PayflowProInput = {
  /** Required input for credit card related information. */
  cc_details: CreditCardDetailsInput;
  /** Indicates whether details about the shopper's credit/debit card should be tokenized for later usage. Required only if Vault is enabled for the PayPal Payflow Pro payment integration. */
  is_active_payment_token_enabler?: Maybe<Scalars['Boolean']>;
};

/** Input required to complete payment. Applies to Payflow Pro and Payments Pro payment methods. */
export type PayflowProResponseInput = {
  /** The unique ID that identifies the shopper's cart. */
  cart_id: Scalars['String'];
  /** The payload returned from PayPal. */
  paypal_payload: Scalars['String'];
};

export type PayflowProResponseOutput = {
  __typename?: 'PayflowProResponseOutput';
  /** The cart with the updated selected payment method. */
  cart: Cart;
};

/** Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods. */
export type PayflowProToken = {
  __typename?: 'PayflowProToken';
  /** The RESPMSG returned by PayPal. If the `result` is `0`, then `response_message` is `Approved`. */
  response_message: Scalars['String'];
  /** A non-zero value if any errors occurred. */
  result: Scalars['Int'];
  /** The RESULT returned by PayPal. A value of `0` indicates the transaction was approved. */
  result_code: Scalars['Int'];
  /** A secure token generated by PayPal. */
  secure_token: Scalars['String'];
  /** A secure token ID generated by PayPal. */
  secure_token_id: Scalars['String'];
};

/** Contains input required to fetch payment token information for the Payflow Pro and Payments Pro payment methods. */
export type PayflowProTokenInput = {
  /** The unique ID that identifies the shopper's cart. */
  cart_id: Scalars['String'];
  /** A set of relative URLs that PayPal uses for callback. */
  urls: PayflowProUrlInput;
};

/** Contains a set of relative URLs that PayPal uses in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for the Payflow Pro and Payment Pro payment methods. */
export type PayflowProUrlInput = {
  /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
  cancel_url: Scalars['String'];
  /** The relative URL of the transaction error page that PayPal redirects to upon payment error. If the full URL to this page is https://www.example.com/paypal/action/error.html, the relative URL is paypal/action/error.html. */
  error_url: Scalars['String'];
  /** The relative URL of the final confirmation page that PayPal redirects to upon payment success. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
  return_url: Scalars['String'];
};

/** Defines the payment method. */
export type PaymentMethodInput = {
  /** Required input for Clearpay payment */
  clearpay?: Maybe<ClearpayInput>;
  /** The internal name for the payment method. */
  code: Scalars['String'];
  /** Required input for PayPal Hosted pro payments. */
  hosted_pro?: Maybe<HostedProInput>;
  klarna?: Maybe<KlarnaInput>;
  /** Required input for Payflow Express Checkout payments. */
  payflow_express?: Maybe<PayflowExpressInput>;
  /** Required input for PayPal Payflow Link and Payments Advanced payments. */
  payflow_link?: Maybe<PayflowLinkInput>;
  /** Required input for PayPal Payflow Pro and Payment Pro payments. */
  payflowpro?: Maybe<PayflowProInput>;
  /** Required input for PayPal Payflow Pro vault payments. */
  payflowpro_cc_vault?: Maybe<VaultTokenInput>;
  /** Required input for Express Checkout and Payments Standard payments. */
  paypal_express?: Maybe<PaypalExpressInput>;
  /** The purchase order number. Optional for most payment methods. */
  purchase_order_number?: Maybe<Scalars['String']>;
  /** Required input for Stripe Payments */
  stripe_payments?: Maybe<StripePaymentsInput>;
};

/** The stored payment method available to the customer. */
export type PaymentToken = {
  __typename?: 'PaymentToken';
  /** A description of the stored account details. */
  details?: Maybe<Scalars['String']>;
  /** The payment method code associated with the token. */
  payment_method_code: Scalars['String'];
  /** The public hash of the token. */
  public_hash: Scalars['String'];
  /** Specifies the payment token type. */
  type: PaymentTokenTypeEnum;
};

/** The list of available payment token types. */
export enum PaymentTokenTypeEnum {
  /** phpcs:ignore Magento2.GraphQL.ValidArgumentName */
  Card = 'card',
  /** phpcs:ignore Magento2.GraphQL.ValidArgumentName */
  Account = 'account'
}

/** Contains required input for Express Checkout and Payments Standard payments. */
export type PaypalExpressInput = {
  /** The unique ID of the PayPal user. */
  payer_id: Scalars['String'];
  /** The token returned by the `createPaypalExpressToken` mutation. */
  token: Scalars['String'];
};

/** Deprecated. Use `PaypalExpressTokenOutput` instead. */
export type PaypalExpressToken = {
  __typename?: 'PaypalExpressToken';
  /**
   * A set of URLs that allow the buyer to authorize payment and adjust checkout details.
   * @deprecated Use `PaypalExpressTokenOutput.paypal_urls` instead.
   */
  paypal_urls?: Maybe<PaypalExpressUrlList>;
  /**
   * The token returned by PayPal.
   * @deprecated Use `PaypalExpressTokenOutput.token` instead.
   */
  token?: Maybe<Scalars['String']>;
};

/** Defines the attributes required to receive a payment token for Express Checkout and Payments Standard payment methods. */
export type PaypalExpressTokenInput = {
  /** The unique ID that identifies the customer's cart. */
  cart_id: Scalars['String'];
  /** The payment method code. */
  code: Scalars['String'];
  /** Indicates whether the buyer selected the quick checkout button. The default value is false. */
  express_button?: Maybe<Scalars['Boolean']>;
  /** A set of relative URLs that PayPal uses in response to various actions during the authorization process. */
  urls: PaypalExpressUrlsInput;
  /** Indicates whether the buyer clicked the PayPal credit button. The default value is false. */
  use_paypal_credit?: Maybe<Scalars['Boolean']>;
};

/** Contains the token returned by PayPal and a set of URLs that allow the buyer to authorize payment and adjust checkout details. Applies to Express Checkout and Payments Standard payment methods. */
export type PaypalExpressTokenOutput = {
  __typename?: 'PaypalExpressTokenOutput';
  /** A set of URLs that allow the buyer to authorize payment and adjust checkout details. */
  paypal_urls?: Maybe<PaypalExpressUrlList>;
  /** The token returned by PayPal. */
  token?: Maybe<Scalars['String']>;
};

/** Contains a set of URLs that allow the buyer to authorize payment and adjust checkout details for Express Checkout and Payments Standard transactions. */
export type PaypalExpressUrlList = {
  __typename?: 'PaypalExpressUrlList';
  /** The PayPal URL that allows the buyer to edit their checkout details. */
  edit?: Maybe<Scalars['String']>;
  /** The URL to the PayPal login page. */
  start?: Maybe<Scalars['String']>;
};

/** Contains a set of relative URLs that PayPal uses in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Express Checkout and Payments Standard payment methods. */
export type PaypalExpressUrlsInput = {
  /** The relative URL of the page that PayPal redirects to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html. */
  cancel_url: Scalars['String'];
  /** The relative URL of the page that PayPal redirects to when the payment has been put on hold for additional review. This condition mostly applies to ACH transactions, and is not applicable to most PayPal solutions. If the full URL to this page is https://www.example.com/paypal/action/success_pending.html, the relative URL is paypal/action/success_pending.html. */
  pending_url?: Maybe<Scalars['String']>;
  /** The relative URL of the final confirmation page that PayPal redirects to upon payment success. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html. */
  return_url: Scalars['String'];
  /** The relative URL of the order confirmation page that PayPal redirects to when the payment is successful and additional confirmation is not needed. Not applicable to most PayPal solutions. If the full URL to this page is https://www.example.com/paypal/action/success.html, the relative URL is paypal/action/success.html. */
  success_url?: Maybe<Scalars['String']>;
};

/** Contains attributes specific to tangible products. */
export type PhysicalProductInterface = {
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']>;
};

/** Defines Pickup Location information. */
export type PickupLocation = {
  __typename?: 'PickupLocation';
  city?: Maybe<Scalars['String']>;
  contact_name?: Maybe<Scalars['String']>;
  country_id?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  pickup_location_code?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
  street?: Maybe<Scalars['String']>;
};

/** PickupLocationFilterInput defines the list of attributes and filters for the search. */
export type PickupLocationFilterInput = {
  /** Filter by city. */
  city?: Maybe<FilterTypeInput>;
  /** Filter by country. */
  country_id?: Maybe<FilterTypeInput>;
  /** Filter by pickup location name. */
  name?: Maybe<FilterTypeInput>;
  /** Filter by pickup location code. */
  pickup_location_code?: Maybe<FilterTypeInput>;
  /** Filter by postcode. */
  postcode?: Maybe<FilterTypeInput>;
  /** Filter by region. */
  region?: Maybe<FilterTypeInput>;
  /** Filter by region id. */
  region_id?: Maybe<FilterTypeInput>;
  /** Filter by street. */
  street?: Maybe<FilterTypeInput>;
};

/** PickupLocationSortInput specifies attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order. */
export type PickupLocationSortInput = {
  /** City where pickup location is placed. */
  city?: Maybe<SortEnum>;
  /** Name of the contact person. */
  contact_name?: Maybe<SortEnum>;
  /** Id of the country in two letters. */
  country_id?: Maybe<SortEnum>;
  /** Description of the pickup location. */
  description?: Maybe<SortEnum>;
  /** Distance to the address, requested by distance filter. Applicable only with distance filter. If distance sort order is present, all other sort orders will be ignored. */
  distance?: Maybe<SortEnum>;
  /** Contact email of the pickup location. */
  email?: Maybe<SortEnum>;
  /** Contact fax of the pickup location. */
  fax?: Maybe<SortEnum>;
  /** Geographic latitude where pickup location is placed. */
  latitude?: Maybe<SortEnum>;
  /** Geographic longitude where pickup location is placed. */
  longitude?: Maybe<SortEnum>;
  /** The pickup location name. Customer use this to identify the pickup location. */
  name?: Maybe<SortEnum>;
  /** Contact phone number of the pickup location. */
  phone?: Maybe<SortEnum>;
  /** A code assigned to pickup location to identify the source. */
  pickup_location_code?: Maybe<SortEnum>;
  /** Postcode where pickup location is placed. */
  postcode?: Maybe<SortEnum>;
  /** Name of the region. */
  region?: Maybe<SortEnum>;
  /** Id of the region. */
  region_id?: Maybe<SortEnum>;
  /** Street where pickup location is placed. */
  street?: Maybe<SortEnum>;
};

/** Top level object returned in a pickup locations search. */
export type PickupLocations = {
  __typename?: 'PickupLocations';
  /** An array of pickup locations that match the specific search request. */
  items?: Maybe<Array<Maybe<PickupLocation>>>;
  /** An object that includes the page_info and currentPage values specified in the query. */
  page_info?: Maybe<SearchResultPageInfo>;
  /** The number of products returned. */
  total_count?: Maybe<Scalars['Int']>;
};

/** Specifies the quote to be converted to an order. */
export type PlaceOrderInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
};

/** Contains the results of the request to place an order. */
export type PlaceOrderOutput = {
  __typename?: 'PlaceOrderOutput';
  /** The ID of the order. */
  order: Order;
};

/** Deprecated. Use `ProductPrice` instead. Defines the price of a product as well as any tax-related adjustments. */
export type Price = {
  __typename?: 'Price';
  /**
   * An array that provides information about tax, weee, or weee_tax adjustments.
   * @deprecated Use `ProductPrice` instead.
   */
  adjustments?: Maybe<Array<Maybe<PriceAdjustment>>>;
  /**
   * The price of a product plus a three-letter currency code.
   * @deprecated Use `ProductPrice` instead.
   */
  amount?: Maybe<Money>;
};

/** Deprecated. Taxes will be included or excluded in the price. Defines the amount of money to apply as an adjustment, the type of adjustment to apply, and whether the item is included or excluded from the adjustment. */
export type PriceAdjustment = {
  __typename?: 'PriceAdjustment';
  /** The amount of the price adjustment and its currency code. */
  amount?: Maybe<Money>;
  /**
   * Indicates whether the adjustment involves tax, weee, or weee_tax.
   * @deprecated `PriceAdjustment` is deprecated.
   */
  code?: Maybe<PriceAdjustmentCodesEnum>;
  /**
   * Indicates whether the entity described by the code attribute is included or excluded from the adjustment.
   * @deprecated `PriceAdjustment` is deprecated.
   */
  description?: Maybe<PriceAdjustmentDescriptionEnum>;
};

/** `PriceAdjustment.code` is deprecated. */
export enum PriceAdjustmentCodesEnum {
  Tax = 'TAX',
  Weee = 'WEEE',
  WeeeTax = 'WEEE_TAX'
}

/** `PriceAdjustmentDescriptionEnum` is deprecated. States whether a price adjustment is included or excluded. */
export enum PriceAdjustmentDescriptionEnum {
  Included = 'INCLUDED',
  Excluded = 'EXCLUDED'
}

/** Contains the price range for a product. If the product has a single price, the minimum and maximum price will be the same. */
export type PriceRange = {
  __typename?: 'PriceRange';
  /** The highest possible price for the product. */
  maximum_price?: Maybe<ProductPrice>;
  /** The lowest possible price for the product. */
  minimum_price: ProductPrice;
};

/** Defines the price type. */
export enum PriceTypeEnum {
  Fixed = 'FIXED',
  Percent = 'PERCENT',
  Dynamic = 'DYNAMIC'
}

/** Defines whether a bundle product's price is displayed as the lowest possible value or as a range. */
export enum PriceViewEnum {
  PriceRange = 'PRICE_RANGE',
  AsLowAs = 'AS_LOW_AS'
}

export type ProductAttachment = {
  __typename?: 'ProductAttachment';
  file_size?: Maybe<Scalars['String']>;
  frontend_url?: Maybe<Scalars['String']>;
  icon_url?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  readable_file_size?: Maybe<Scalars['String']>;
};

/** Contains a product attribute code and value. */
export type ProductAttribute = {
  __typename?: 'ProductAttribute';
  /** The unique identifier for a product attribute code. */
  code: Scalars['String'];
  /** The display value of the attribute. */
  value: Scalars['String'];
};

/** Defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type ProductAttributeFilterInput = {
  /** New Filter */
  am_is_new?: Maybe<AmShopbyCustomFilterTypeInput>;
  /** Sale Filter */
  am_on_sale?: Maybe<AmShopbyCustomFilterTypeInput>;
  /** Deprecated: use `category_uid` to filter product by category ID. */
  category_id?: Maybe<FilterEqualTypeInput>;
  /** Filter product by the unique ID for a `CategoryInterface` object. */
  category_uid?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Color */
  color?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Lead Time */
  delivery?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Description */
  description?: Maybe<FilterMatchTypeInput>;
  /** Attribute label: Number of Dining Chairs */
  dining_chairs?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Filling Type */
  filling_type_search?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: FSC Certified */
  fsc_certified?: Maybe<FilterEqualTypeInput>;
  /** Landing Page Id. */
  landing_page_id?: Maybe<FilterTypeInput>;
  /** Attribute label: Brands */
  manufacturer?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Mattress Depth  */
  mattress_depth?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Mattress Firmness */
  mattress_tention?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Mattress Type */
  mattress_type?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Product Name */
  name?: Maybe<FilterMatchTypeInput>;
  /** Attribute label: Number Of Springs */
  number_of_springs?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Price */
  price?: Maybe<FilterRangeTypeInput>;
  /** Rating Filter */
  rating_summary?: Maybe<AmShopbyCustomFilterTypeInput>;
  /** Attribute label: Room Type */
  room_type?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Short Description */
  short_description?: Maybe<FilterMatchTypeInput>;
  /** Attribute label: Size */
  size?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: SKU */
  sku?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Spring Type  */
  spring_type_search?: Maybe<FilterEqualTypeInput>;
  /** Stock Filter */
  stock_status?: Maybe<AmShopbyCustomFilterTypeInput>;
  /** Attribute label: Table Material */
  table_material?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: Tax Class */
  tax_class_id?: Maybe<FilterEqualTypeInput>;
  /** Attribute label: TV Size */
  tv_size?: Maybe<FilterEqualTypeInput>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<FilterEqualTypeInput>;
};

/** ProductAttributeSortInput specifies the attribute to use for sorting. */
export type ProductAttributeSortInput = {
  /** Is product bestsellers. */
  bestsellers?: Maybe<SortEnum>;
  /** Attribute label: Brands */
  manufacturer?: Maybe<SortEnum>;
  /** Attribute label: Mattress Type */
  mattress_type?: Maybe<SortEnum>;
  /** The product most_viewed. */
  most_viewed?: Maybe<SortEnum>;
  /** Attribute label: Product Name */
  name?: Maybe<SortEnum>;
  /** Is product new. */
  new?: Maybe<SortEnum>;
  /** Sort by the position assigned to each product. */
  position?: Maybe<SortEnum>;
  /** Sort by the position assigned to each product. */
  price?: Maybe<SortEnum>;
  /** The product price_asc. */
  price_asc?: Maybe<SortEnum>;
  /** The product price_desc. */
  price_desc?: Maybe<SortEnum>;
  /** The product rating_summary. */
  rating_summary?: Maybe<SortEnum>;
  /** Sort by the search relevance score (default). */
  relevance?: Maybe<SortEnum>;
  /** Revenue. */
  revenue?: Maybe<SortEnum>;
  /** The product reviews_count. */
  reviews_count?: Maybe<SortEnum>;
  /** The product saving. */
  saving?: Maybe<SortEnum>;
  /** Attribute label: SKU */
  sku?: Maybe<SortEnum>;
  /** Is product wished. */
  wished?: Maybe<SortEnum>;
};

export type ProductData = {
  __typename?: 'ProductData';
  /** Product add to cart URL. */
  addToCartUrl?: Maybe<Scalars['String']>;
  /** Product add to compare params. */
  addToCompareParams?: Maybe<Scalars['String']>;
  /** Product has required options. */
  hasRequiredOptions?: Maybe<Scalars['Boolean']>;
  /** Item id. */
  id?: Maybe<Scalars['Int']>;
  /** Product is salable. */
  isSalable?: Maybe<Scalars['Boolean']>;
  /** Product name. */
  name?: Maybe<Scalars['String']>;
  /** A PriceRange object, indicating the range of prices for the product */
  price_range: PriceRange;
  /** Product URL. */
  productUrl?: Maybe<Scalars['String']>;
  /** Product SKU */
  sku: Scalars['String'];
  /** The relative path to the product's small image. */
  small_image?: Maybe<ProductImage>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
};

/** Contains the discount applied to a product price. */
export type ProductDiscount = {
  __typename?: 'ProductDiscount';
  /** The actual value of the discount. */
  amount_off?: Maybe<Scalars['Float']>;
  /** The discount expressed a percentage. */
  percent_off?: Maybe<Scalars['Float']>;
};

/** ProductFilterInput is deprecated, use @ProductAttributeFilterInput instead. ProductFilterInput defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for. */
export type ProductFilterInput = {
  /** The category ID the product belongs to. */
  category_id?: Maybe<FilterTypeInput>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<FilterTypeInput>;
  /** The timestamp indicating when the product was created. */
  created_at?: Maybe<FilterTypeInput>;
  /** The name of a custom layout. */
  custom_layout?: Maybe<FilterTypeInput>;
  /** XML code that is applied as a layout update to the product page. */
  custom_layout_update?: Maybe<FilterTypeInput>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<FilterTypeInput>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<FilterTypeInput>;
  /** Indicates whether additional attributes have been created for the product. */
  has_options?: Maybe<FilterTypeInput>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<FilterTypeInput>;
  /** The label assigned to a product image. */
  image_label?: Maybe<FilterTypeInput>;
  /** Landing Page Id. */
  landing_page_id?: Maybe<FilterTypeInput>;
  /** A number representing the product's manufacturer. */
  manufacturer?: Maybe<FilterTypeInput>;
  /** The numeric maximal price of the product. Do not include the currency code. */
  max_price?: Maybe<FilterTypeInput>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<FilterTypeInput>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<FilterTypeInput>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<FilterTypeInput>;
  /** The numeric minimal price of the product. Do not include the currency code. */
  min_price?: Maybe<FilterTypeInput>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<FilterTypeInput>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  news_from_date?: Maybe<FilterTypeInput>;
  /** The end date for new product listings. */
  news_to_date?: Maybe<FilterTypeInput>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<FilterTypeInput>;
  /** The keyword required to perform a logical OR comparison. */
  or?: Maybe<ProductFilterInput>;
  /** The price of an item. */
  price?: Maybe<FilterTypeInput>;
  /** Indicates whether the product has required options. */
  required_options?: Maybe<FilterTypeInput>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<FilterTypeInput>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<FilterTypeInput>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<FilterTypeInput>;
  /** The label assigned to a product's small image. */
  small_image_label?: Maybe<FilterTypeInput>;
  /** The beginning date that a product has a special price. */
  special_from_date?: Maybe<FilterTypeInput>;
  /** The discounted price of the product. Do not include the currency code. */
  special_price?: Maybe<FilterTypeInput>;
  /** The end date that a product has a special price. */
  special_to_date?: Maybe<FilterTypeInput>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<FilterTypeInput>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<FilterTypeInput>;
  /** The label assigned to a product's thumbnail image. */
  thumbnail_label?: Maybe<FilterTypeInput>;
  /** The price when tier pricing is in effect and the items purchased threshold has been reached. */
  tier_price?: Maybe<FilterTypeInput>;
  /** The timestamp indicating when the product was updated. */
  updated_at?: Maybe<FilterTypeInput>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<FilterTypeInput>;
  url_path?: Maybe<FilterTypeInput>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<FilterTypeInput>;
};

/** Contains product image information, including the image URL and label. */
export type ProductImage = MediaGalleryInterface & {
  __typename?: 'ProductImage';
  /** Indicates whether the image is hidden from view. */
  disabled?: Maybe<Scalars['Boolean']>;
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']>;
};

/** Product Information used for Pickup Locations search. */
export type ProductInfoInput = {
  /** Product SKU. */
  sku: Scalars['String'];
};

/** Contains fields that are common to all types of products. */
export type ProductInterface = {
  /** Add to cart url. */
  add_to_cart_url?: Maybe<Scalars['String']>;
  /** Add to wishlist information. */
  add_to_wishlist?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  additional_features?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  assembly_type?: Maybe<Scalars['Int']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_colours?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_sizes?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  back_stock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  backstock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  barcode?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  base_slat_type?: Maybe<Scalars['Int']>;
  /** Custom data in bedkingdom website */
  bed_data?: Maybe<BedData>;
  /** @deprecated Use the `custom_attributes` field instead. */
  benifts?: Maybe<Scalars['String']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  chair_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  colour?: Maybe<Scalars['String']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  delivery?: Maybe<Scalars['Int']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dimentions?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dining_chairs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_drawers?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_fabric?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  exchange_return_upgrade?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  feet_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  filling_type_search?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  fold_mechanism?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  free_delivery?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  furniture_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ggiftcard_amount_config?: Maybe<Scalars['String']>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gtin?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  guarantee?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  headboard_included?: Maybe<Scalars['Int']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ladder?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  leg_diameter?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  length?: Maybe<Scalars['String']>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  matching_headboard?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  material_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_bundle?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_depth?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_tention?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_turn?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_type?: Maybe<Scalars['Int']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mpn?: Maybe<Scalars['String']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  nocupboards?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  number_of_springs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  numberdrawers?: Maybe<Scalars['Int']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  optional_extras?: Maybe<Scalars['Int']>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Product url. */
  product_url?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ranges?: Maybe<Scalars['Int']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  room_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  seat_type?: Maybe<Scalars['Int']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  size?: Maybe<Scalars['Int']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  split?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type_search?: Maybe<Scalars['Int']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  stompa_colours?: Maybe<Scalars['Int']>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_top_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  temperature_control_fabric?: Maybe<Scalars['Int']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  top_bunk_size?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_options?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_size?: Maybe<Scalars['Int']>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  udropship_vendor?: Maybe<Scalars['Int']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  wardrobe_doors?: Maybe<Scalars['Int']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
};


/** Contains fields that are common to all types of products. */
export type ProductInterfaceReviewsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

/** An implementation of `ProductLinksInterface`. */
export type ProductLinks = ProductLinksInterface & {
  __typename?: 'ProductLinks';
  /** One of related, associated, upsell, or crosssell. */
  link_type?: Maybe<Scalars['String']>;
  /** The SKU of the linked product. */
  linked_product_sku?: Maybe<Scalars['String']>;
  /** The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable). */
  linked_product_type?: Maybe<Scalars['String']>;
  /** The position within the list of product links. */
  position?: Maybe<Scalars['Int']>;
  /** The identifier of the linked product. */
  sku?: Maybe<Scalars['String']>;
};

/** Contains information about linked products, including the link type and product type of each item. */
export type ProductLinksInterface = {
  /** One of related, associated, upsell, or crosssell. */
  link_type?: Maybe<Scalars['String']>;
  /** The SKU of the linked product. */
  linked_product_sku?: Maybe<Scalars['String']>;
  /** The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable). */
  linked_product_type?: Maybe<Scalars['String']>;
  /** The position within the list of product links. */
  position?: Maybe<Scalars['Int']>;
  /** The identifier of the linked product. */
  sku?: Maybe<Scalars['String']>;
};

export type ProductMattressOffers = {
  __typename?: 'ProductMattressOffers';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** Contains an image in base64 format and basic information about the image. */
export type ProductMediaGalleryEntriesContent = {
  __typename?: 'ProductMediaGalleryEntriesContent';
  /** The image in base64 format. */
  base64_encoded_data?: Maybe<Scalars['String']>;
  /** The file name of the image. */
  name?: Maybe<Scalars['String']>;
  /** The MIME type of the file, such as image/png. */
  type?: Maybe<Scalars['String']>;
};

/** Contains a link to a video file and basic information about the video. */
export type ProductMediaGalleryEntriesVideoContent = {
  __typename?: 'ProductMediaGalleryEntriesVideoContent';
  /** Must be external-video. */
  media_type?: Maybe<Scalars['String']>;
  /** A description of the video. */
  video_description?: Maybe<Scalars['String']>;
  /** Optional data about the video. */
  video_metadata?: Maybe<Scalars['String']>;
  /** Describes the video source. */
  video_provider?: Maybe<Scalars['String']>;
  /** The title of the video. */
  video_title?: Maybe<Scalars['String']>;
  /** The URL to the video. */
  video_url?: Maybe<Scalars['String']>;
};

export type ProductMoreInformation = {
  __typename?: 'ProductMoreInformation';
  code?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** Represents a product price. */
export type ProductPrice = {
  __typename?: 'ProductPrice';
  /** The price discount. Represents the difference between the regular and final price. */
  discount?: Maybe<ProductDiscount>;
  /** The final price of the product after applying discounts. */
  final_price: Money;
  /** An array of the multiple Fixed Product Taxes that can be applied to a product price. */
  fixed_product_taxes?: Maybe<Array<Maybe<FixedProductTax>>>;
  /** The regular price of the product. */
  regular_price: Money;
};

/** Deprecated. Use `PriceRange` instead. Contains the regular price of an item, as well as its minimum and maximum prices. Only composite products, which include bundle, configurable, and grouped products, can contain a minimum and maximum price. */
export type ProductPrices = {
  __typename?: 'ProductPrices';
  /**
   * The highest possible final price for all the options defined within a composite product. If you are specifying a price range, this would be the `to` value.
   * @deprecated Use `PriceRange.maximum_price` instead.
   */
  maximalPrice?: Maybe<Price>;
  /**
   * The lowest possible final price for all the options defined within a composite product. If you are specifying a price range, this would be the `from` value.
   * @deprecated Use `PriceRange.minimum_price` instead.
   */
  minimalPrice?: Maybe<Price>;
  /**
   * The base price of a product.
   * @deprecated Use `regular_price` from `PriceRange.minimum_price` or `PriceRange.maximum_price` instead.
   */
  regularPrice?: Maybe<Price>;
};

export type ProductQuestion = {
  __typename?: 'ProductQuestion';
  question_setting?: Maybe<QuestionSetting>;
  questions?: Maybe<Array<Maybe<AnswerQuestion>>>;
  total?: Maybe<Scalars['Int']>;
};

export type ProductQuestionInput = {
  category_ids?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notification?: Maybe<Scalars['Boolean']>;
  product_ids?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type ProductQuestionOutput = {
  __typename?: 'ProductQuestionOutput';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

/** Contains details of a product review. */
export type ProductReview = {
  __typename?: 'ProductReview';
  /** The average of all ratings for this product. */
  average_rating: Scalars['Float'];
  /** The date the review was created. */
  created_at: Scalars['String'];
  /** The customer's nickname. Defaults to the customer name, if logged in. */
  nickname: Scalars['String'];
  /** The reviewed product. */
  product: ProductInterface;
  /** An array of ratings by rating category, such as quality, price, and value. */
  ratings_breakdown: Array<Maybe<ProductReviewRating>>;
  /** The summary (title) of the review. */
  summary: Scalars['String'];
  /** The review text. */
  text: Scalars['String'];
};

/** Contains data about a single aspect of a product review. */
export type ProductReviewRating = {
  __typename?: 'ProductReviewRating';
  /** The label assigned to an aspect of a product that is being rated, such as quality or price. */
  name: Scalars['String'];
  /** The rating value given by customer. By default, possible values range from 1 to 5. */
  value: Scalars['String'];
};

/** Contains the reviewer's rating for a single aspect of a review. */
export type ProductReviewRatingInput = {
  /** An encoded rating ID. */
  id: Scalars['String'];
  /** An encoded rating value ID. */
  value_id: Scalars['String'];
};

/** Contains details about a single aspect of a product review. */
export type ProductReviewRatingMetadata = {
  __typename?: 'ProductReviewRatingMetadata';
  /** An encoded rating ID. */
  id: Scalars['String'];
  /** The label assigned to an aspect of a product that is being rated, such as quality or price. */
  name: Scalars['String'];
  /** List of product review ratings sorted by position. */
  values: Array<Maybe<ProductReviewRatingValueMetadata>>;
};

/** Contains details about a single value in a product review. */
export type ProductReviewRatingValueMetadata = {
  __typename?: 'ProductReviewRatingValueMetadata';
  /** A ratings scale, such as the number of stars awarded. */
  value: Scalars['String'];
  /** An encoded rating value ID. */
  value_id: Scalars['String'];
};

/** Contains an array of metadata about each aspect of a product review. */
export type ProductReviewRatingsMetadata = {
  __typename?: 'ProductReviewRatingsMetadata';
  /** An array of product reviews sorted by position. */
  items: Array<Maybe<ProductReviewRatingMetadata>>;
};

/** Contains an array of product reviews. */
export type ProductReviews = {
  __typename?: 'ProductReviews';
  /** An array of product reviews. */
  items: Array<Maybe<ProductReview>>;
  /** Metadata for pagination rendering. */
  page_info: SearchResultPageInfo;
};

/** ProductSortInput specifies the attribute to use for sorting. */
export type ProductSortInput = {
  /** Is product bestsellers. */
  bestsellers?: Maybe<SortEnum>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<SortEnum>;
  /** The timestamp indicating when the product was created. */
  created_at?: Maybe<SortEnum>;
  /** The name of a custom layout. */
  custom_layout?: Maybe<SortEnum>;
  /** XML code that is applied as a layout update to the product page. */
  custom_layout_update?: Maybe<SortEnum>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<SortEnum>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<SortEnum>;
  /** Indicates whether additional attributes have been created for the product. */
  has_options?: Maybe<SortEnum>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<SortEnum>;
  /** The label assigned to a product image. */
  image_label?: Maybe<SortEnum>;
  /** A number representing the product's manufacturer. */
  manufacturer?: Maybe<SortEnum>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<SortEnum>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<SortEnum>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<SortEnum>;
  /** The product most_viewed. */
  most_viewed?: Maybe<SortEnum>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<SortEnum>;
  /** Is product new. */
  new?: Maybe<SortEnum>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  news_from_date?: Maybe<SortEnum>;
  /** The end date for new product listings. */
  news_to_date?: Maybe<SortEnum>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<SortEnum>;
  /** The price of the item. */
  price?: Maybe<SortEnum>;
  /** The product price_asc. */
  price_asc?: Maybe<SortEnum>;
  /** The product price_desc. */
  price_desc?: Maybe<SortEnum>;
  /** The product rating_summary. */
  rating_summary?: Maybe<SortEnum>;
  /** Indicates whether the product has required options. */
  required_options?: Maybe<SortEnum>;
  /** Revenue. */
  revenue?: Maybe<SortEnum>;
  /** The product reviews_count. */
  reviews_count?: Maybe<SortEnum>;
  /** The product saving. */
  saving?: Maybe<SortEnum>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<SortEnum>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<SortEnum>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<SortEnum>;
  /** The label assigned to a product's small image. */
  small_image_label?: Maybe<SortEnum>;
  /** The beginning date that a product has a special price. */
  special_from_date?: Maybe<SortEnum>;
  /** The discounted price of the product. */
  special_price?: Maybe<SortEnum>;
  /** The end date that a product has a special price. */
  special_to_date?: Maybe<SortEnum>;
  /** Indicates the criteria to sort swatches. */
  swatch_image?: Maybe<SortEnum>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<SortEnum>;
  /** The label assigned to a product's thumbnail image. */
  thumbnail_label?: Maybe<SortEnum>;
  /** The price when tier pricing is in effect and the items purchased threshold has been reached. */
  tier_price?: Maybe<SortEnum>;
  /** The timestamp indicating when the product was updated. */
  updated_at?: Maybe<SortEnum>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<SortEnum>;
  url_path?: Maybe<SortEnum>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<SortEnum>;
  /** Is product wished. */
  wished?: Maybe<SortEnum>;
};

/** This enumeration states whether a product stock status is in stock or out of stock */
export enum ProductStockStatus {
  InStock = 'IN_STOCK',
  OutOfStock = 'OUT_OF_STOCK'
}

/** Deprecated. Use `TierPrice` instead. Defines a tier price, which is a quantity discount offered to a specific customer group. */
export type ProductTierPrices = {
  __typename?: 'ProductTierPrices';
  /**
   * The ID of the customer group.
   * @deprecated Not relevant for the storefront.
   */
  customer_group_id?: Maybe<Scalars['String']>;
  /**
   * The percentage discount of the item.
   * @deprecated Use `TierPrice.discount` instead.
   */
  percentage_value?: Maybe<Scalars['Float']>;
  /**
   * The number of items that must be purchased to qualify for tier pricing.
   * @deprecated Use `TierPrice.quantity` instead.
   */
  qty?: Maybe<Scalars['Float']>;
  /**
   * The price of the fixed price item.
   * @deprecated Use `TierPrice.final_price` instead.
   */
  value?: Maybe<Scalars['Float']>;
  /**
   * The ID assigned to the website.
   * @deprecated Not relevant for the storefront.
   */
  website_id?: Maybe<Scalars['Float']>;
};

/** Contains information about a product video. */
export type ProductVideo = MediaGalleryInterface & {
  __typename?: 'ProductVideo';
  /** Indicates whether the image is hidden from view. */
  disabled?: Maybe<Scalars['Boolean']>;
  /** The label of the product image or video. */
  label?: Maybe<Scalars['String']>;
  /** The media item's position after it has been sorted. */
  position?: Maybe<Scalars['Int']>;
  /** The URL of the product image or video. */
  url?: Maybe<Scalars['String']>;
  /** Contains a `ProductMediaGalleryEntriesVideoContent` object. */
  video_content?: Maybe<ProductMediaGalleryEntriesVideoContent>;
};

/** Contains the results of a `products` query. */
export type Products = {
  __typename?: 'Products';
  /** A bucket that contains the attribute code and label for each filterable option. */
  aggregations?: Maybe<Array<Maybe<Aggregation>>>;
  /**
   * Layered navigation filters array.
   * @deprecated Use `aggregations` instead.
   */
  filters?: Maybe<Array<Maybe<LayerFilter>>>;
  /** An array of products that match the specified search criteria. */
  items?: Maybe<Array<Maybe<ProductInterface>>>;
  /** An object that includes the page_info and currentPage values specified in the query. */
  page_info?: Maybe<SearchResultPageInfo>;
  rich_snippets?: Maybe<Scalars['String']>;
  /** An object that includes the default sort field and all available sort fields. */
  sort_fields?: Maybe<SortFields>;
  /** An array of search suggestions for case when search query have no results. */
  suggestions?: Maybe<Array<Maybe<SearchSuggestion>>>;
  /** The number of products that are marked as visible. By default, in complex products, parent products are visible, but their child products are not. */
  total_count?: Maybe<Scalars['Int']>;
};


/** Contains the results of a `products` query. */
export type ProductsAggregationsArgs = {
  filter?: Maybe<AggregationsFilterInput>;
};

export type Query = {
  __typename?: 'Query';
  amBlogAuthor?: Maybe<AmBlogAuthor>;
  amBlogAuthors?: Maybe<AmBlogAuthors>;
  amBlogCategories?: Maybe<AmBlogCategories>;
  amBlogCategoriesWidget?: Maybe<AmBlogCategoriesWidget>;
  amBlogCategory?: Maybe<AmBlogCategory>;
  amBlogChildCategories?: Maybe<AmBlogCategories>;
  amBlogComments?: Maybe<AmBlogComments>;
  amBlogFeaturedPostsWidget?: Maybe<AmBlogFeaturedPostsWidget>;
  amBlogPost?: Maybe<AmBlogPost>;
  amBlogPostRelatedProducts?: Maybe<AmBlogProducts>;
  amBlogPosts?: Maybe<AmBlogPosts>;
  amBlogPostsByCategoryId?: Maybe<AmBlogPosts>;
  amBlogPostsByIds?: Maybe<AmBlogPosts>;
  amBlogPostsSearch?: Maybe<AmBlogPosts>;
  amBlogRecentCommentsWidget?: Maybe<AmBlogRecentCommentsWidget>;
  amBlogRecentPostsWidget?: Maybe<AmBlogRecentPostsWidget>;
  amBlogRelatedPosts?: Maybe<AmBlogPosts>;
  amBlogSetting?: Maybe<AmBlogSetting>;
  amBlogTags?: Maybe<AmBlogTags>;
  amBlogTagsWidget?: Maybe<AmBlogTagsWidget>;
  amBrandGetMoreFromThisBrandBlock?: Maybe<MoreFromBrand>;
  /** Get gift card account information by code */
  amGiftCardAccount?: Maybe<AmGiftCardAccount>;
  /** Get rendered email template for preview. */
  amGiftCardPreview?: Maybe<AmGiftCardPreview>;
  /** Get gift card module settings */
  amGiftCardSetting?: Maybe<AmGiftCardSettings>;
  amLabelProvider?: Maybe<Array<Maybe<AmLabelList>>>;
  amLabelSetting?: Maybe<AmLabelSetting>;
  amMostviewedBundlePacks?: Maybe<AmMostviewedBundlePacks>;
  amMostviewedGroups?: Maybe<AmMostviewedRelatedRules>;
  amOrderList?: Maybe<Array<Maybe<SortingOrder>>>;
  /** Get current user's gift card accounts. */
  amUserGiftCardAccount?: Maybe<Array<Maybe<AmGiftCardAccount>>>;
  ambrandlist?: Maybe<BrandList>;
  ambrandslider?: Maybe<BrandSlider>;
  amfeaturedWidget?: Maybe<Array<Maybe<ProductData>>>;
  amlanding?: Maybe<Landing>;
  /** Get a list of available store views and their config information. */
  availableStores?: Maybe<Array<Maybe<StoreConfig>>>;
  calculateDeliveryNextDay?: Maybe<DeliveryNextDay>;
  /** Return information about the specified shopping cart. */
  cart?: Maybe<Cart>;
  /** Return a list of categories that match the specified filter. */
  categories?: Maybe<CategoryResult>;
  /**
   * Search for categories that match the criteria specified in the `search` and `filter` attributes.
   * @deprecated Use `categoryList` instead.
   */
  category?: Maybe<CategoryTree>;
  /** Return an array of categories based on the specified filters. */
  categoryList?: Maybe<Array<Maybe<CategoryTree>>>;
  /** Return Terms and Conditions configuration information. */
  checkoutAgreements?: Maybe<Array<Maybe<CheckoutAgreement>>>;
  checkoutSessionConfig?: Maybe<CheckoutSessionConfigOutput>;
  checkoutSessionDetails?: Maybe<CheckoutSessionDetailsOutput>;
  checkoutSessionSignIn?: Maybe<CheckoutSessionSignInOutput>;
  chiakiConfig?: Maybe<Array<Maybe<ChiakiConfig>>>;
  /** The urlResolver query returns the relative URL for a specified product, category or CMS page, using as input a url_key appended by the url_suffix, if one exists */
  chiakiPageResolver?: Maybe<ChiakiPage>;
  /** Return information about CMS blocks. */
  cmsBlocks?: Maybe<CmsBlocks>;
  /** Return details about a CMS page. */
  cmsPage?: Maybe<CmsPage>;
  /** Return products that have been added to the specified compare list. */
  compareList?: Maybe<CompareList>;
  /** The countries query provides information for all countries. */
  countries?: Maybe<Array<Maybe<Country>>>;
  /** The countries query provides information for a single country. */
  country?: Maybe<Country>;
  /** Return information about the store's currency. */
  currency?: Maybe<Currency>;
  /** Return the attribute type, given an attribute code and entity type. */
  customAttributeMetadata?: Maybe<CustomAttributeMetadata>;
  /** Return detailed information about a customer account. */
  customer?: Maybe<Customer>;
  /** Return information about the customer's shopping cart. */
  customerCart: Cart;
  /** Return a list of downloadable products the customer has purchased. */
  customerDownloadableProducts?: Maybe<CustomerDownloadableProducts>;
  /** @deprecated Use the `customer` query instead. */
  customerOrders?: Maybe<CustomerOrders>;
  /** Return a list of customer payment tokens stored in the vault. */
  customerPaymentTokens?: Maybe<CustomerPaymentTokens>;
  customform?: Maybe<Form>;
  defaultSorting?: Maybe<Array<Maybe<SortingOrder>>>;
  /** get banner in homepage */
  getBannerHomepage?: Maybe<OwlCarouselSliderOutput>;
  getGoogleTagManager?: Maybe<GoogleTagManagerScripts>;
  /** Retrieve the secure PayPal URL for a Payments Pro Hosted Solution transaction. */
  getHostedProUrl?: Maybe<HostedProUrl>;
  /** get menu items */
  getMenuItems?: Maybe<Array<Maybe<MegamenuItemsOutput>>>;
  /** Retrieve payment credentials for a transaction. Use this query for Payflow Link and Payments Advanced payment methods. */
  getPayflowLinkToken?: Maybe<PayflowLinkToken>;
  getProductAttachments?: Maybe<Array<Maybe<ProductAttachment>>>;
  getProductMattressOffers?: Maybe<Array<Maybe<ProductMattressOffers>>>;
  getProductMoreInformation?: Maybe<Array<Maybe<ProductMoreInformation>>>;
  getProductQuestions?: Maybe<ProductQuestion>;
  getRichSnippets?: Maybe<Scalars['String']>;
  getTopSearches?: Maybe<Array<Maybe<SearchTerms>>>;
  getTrustpilotBusinessReviews?: Maybe<TrustpilotBusinessReviewsResponse>;
  getTrustpilotProductReviewsDetail?: Maybe<TrustpilotProductReviewsDetail>;
  /** Check whether the specified email has already been used to create a customer account. */
  isEmailAvailable?: Maybe<IsEmailAvailableOutput>;
  /** The pickup locations query searches for locations that match the search request requirements. */
  pickupLocations?: Maybe<PickupLocations>;
  /** Return the active ratings attributes and the values each rating can have. */
  productReviewRatingsMetadata: ProductReviewRatingsMetadata;
  /** Search for products that match the criteria specified in the `search` and `filter` attributes. */
  products?: Maybe<Products>;
  /** Return the full details for a specified product, category, or CMS page. */
  route?: Maybe<RoutableInterface>;
  search?: Maybe<SearchResult>;
  /** Return details about the store's configuration. */
  storeConfig?: Maybe<StoreConfig>;
  /**
   * Return the relative URL for a specified product, category or CMS page.
   * @deprecated Use the `route` query instead.
   */
  urlResolver?: Maybe<EntityUrl>;
  /**
   * Return the contents of a customer's wish list.
   * @deprecated Moved under `Customer.wishlist`.
   */
  wishlist?: Maybe<WishlistOutput>;
};


export type QueryAmBlogAuthorArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryAmBlogCategoriesWidgetArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryAmBlogCategoryArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryAmBlogChildCategoriesArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryAmBlogCommentsArgs = {
  postId?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};


export type QueryAmBlogFeaturedPostsWidgetArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryAmBlogPostArgs = {
  id?: Maybe<Scalars['Int']>;
  urlKey?: Maybe<Scalars['String']>;
};


export type QueryAmBlogPostRelatedProductsArgs = {
  postId: Scalars['Int'];
};


export type QueryAmBlogPostsArgs = {
  type?: Maybe<AmBlogPageType>;
  page?: Maybe<Scalars['Int']>;
  entityId?: Maybe<Scalars['Int']>;
};


export type QueryAmBlogPostsByCategoryIdArgs = {
  categoryId?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type QueryAmBlogPostsByIdsArgs = {
  ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type QueryAmBlogPostsSearchArgs = {
  page?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
};


export type QueryAmBlogRecentCommentsWidgetArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryAmBlogRecentPostsWidgetArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryAmBlogRelatedPostsArgs = {
  productId: Scalars['Int'];
};


export type QueryAmBlogTagsArgs = {
  postId?: Maybe<Scalars['Int']>;
};


export type QueryAmBlogTagsWidgetArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryAmBrandGetMoreFromThisBrandBlockArgs = {
  productId?: Maybe<Scalars['Int']>;
};


export type QueryAmGiftCardAccountArgs = {
  input: AmGiftCardAccountInput;
};


export type QueryAmGiftCardPreviewArgs = {
  input?: Maybe<AmGiftCardPreviewInput>;
};


export type QueryAmLabelProviderArgs = {
  productIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
  mode?: Maybe<AmLabelMode>;
};


export type QueryAmMostviewedBundlePacksArgs = {
  uid?: Maybe<Scalars['String']>;
};


export type QueryAmMostviewedGroupsArgs = {
  uid: Scalars['String'];
  position?: Maybe<Scalars['String']>;
};


export type QueryAmbrandlistArgs = {
  imageWidth?: Maybe<Scalars['Int']>;
  imageHeight?: Maybe<Scalars['Int']>;
  showCount?: Maybe<Scalars['Boolean']>;
  displayZero?: Maybe<Scalars['Boolean']>;
};


export type QueryAmbrandsliderArgs = {
  imageWidth?: Maybe<Scalars['Int']>;
  imageHeight?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  displayZero?: Maybe<Scalars['Boolean']>;
};


export type QueryAmfeaturedWidgetArgs = {
  sortBy: Scalars['String'];
  amsortingSortOrder: Scalars['String'];
  productsCount: Scalars['Int'];
  conditions: Scalars['String'];
  showPager?: Maybe<Scalars['Boolean']>;
  productsPerPage?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};


export type QueryAmlandingArgs = {
  id: Scalars['Int'];
};


export type QueryAvailableStoresArgs = {
  useCurrentGroup?: Maybe<Scalars['Boolean']>;
};


export type QueryCalculateDeliveryNextDayArgs = {
  productId: Scalars['Int'];
};


export type QueryCartArgs = {
  cart_id: Scalars['String'];
};


export type QueryCategoriesArgs = {
  filters?: Maybe<CategoryFilterInput>;
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};


export type QueryCategoryArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryCategoryListArgs = {
  filters?: Maybe<CategoryFilterInput>;
};


export type QueryCheckoutSessionConfigArgs = {
  cartId?: Maybe<Scalars['String']>;
  omitPayloads?: Maybe<Scalars['Boolean']>;
};


export type QueryCheckoutSessionDetailsArgs = {
  amazonSessionId: Scalars['String'];
  queryTypes?: Maybe<Array<Scalars['String']>>;
};


export type QueryCheckoutSessionSignInArgs = {
  buyerToken: Scalars['String'];
};


export type QueryChiakiConfigArgs = {
  user_id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  store_id?: Maybe<Scalars['String']>;
};


export type QueryChiakiPageResolverArgs = {
  url: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryCmsBlocksArgs = {
  identifiers?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryCmsPageArgs = {
  id?: Maybe<Scalars['Int']>;
  identifier?: Maybe<Scalars['String']>;
};


export type QueryCompareListArgs = {
  uid: Scalars['ID'];
};


export type QueryCountryArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryCustomAttributeMetadataArgs = {
  attributes: Array<AttributeInput>;
};


export type QueryCustomformArgs = {
  formId?: Maybe<Scalars['Int']>;
};


export type QueryDefaultSortingArgs = {
  pageType: PageTypeEnum;
};


export type QueryGetBannerHomepageArgs = {
  sliderId: Scalars['Int'];
};


export type QueryGetHostedProUrlArgs = {
  input: HostedProUrlInput;
};


export type QueryGetMenuItemsArgs = {
  menuId: Scalars['Int'];
};


export type QueryGetPayflowLinkTokenArgs = {
  input: PayflowLinkTokenInput;
};


export type QueryGetProductAttachmentsArgs = {
  productId: Scalars['Int'];
};


export type QueryGetProductMattressOffersArgs = {
  productId: Scalars['Int'];
};


export type QueryGetProductMoreInformationArgs = {
  productId: Scalars['Int'];
};


export type QueryGetProductQuestionsArgs = {
  productId: Scalars['Int'];
  currentPage?: Maybe<Scalars['Int']>;
};


export type QueryGetTopSearchesArgs = {
  storeIds?: Maybe<Scalars['String']>;
  totalSearchTerms?: Maybe<Scalars['Int']>;
};


export type QueryGetTrustpilotProductReviewsDetailArgs = {
  productId: Scalars['Int'];
  stars?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};


export type QueryIsEmailAvailableArgs = {
  email: Scalars['String'];
};


export type QueryPickupLocationsArgs = {
  area?: Maybe<AreaInput>;
  filters?: Maybe<PickupLocationFilterInput>;
  sort?: Maybe<PickupLocationSortInput>;
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  productsInfo?: Maybe<Array<Maybe<ProductInfoInput>>>;
};


export type QueryProductsArgs = {
  search?: Maybe<Scalars['String']>;
  filter?: Maybe<ProductAttributeFilterInput>;
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductAttributeSortInput>;
  currentUrl?: Maybe<Scalars['String']>;
};


export type QueryRouteArgs = {
  url: Scalars['String'];
};


export type QuerySearchArgs = {
  query?: Maybe<Scalars['String']>;
};


export type QueryUrlResolverArgs = {
  url: Scalars['String'];
};

export type QuestionSetting = {
  __typename?: 'QuestionSetting';
  gdpr_enable?: Maybe<Scalars['Boolean']>;
  gdpr_text?: Maybe<Scalars['String']>;
  is_allow_unregistered_customer_ask?: Maybe<Scalars['Boolean']>;
  is_notify_user?: Maybe<Scalars['Boolean']>;
  is_show_ask_question_form?: Maybe<Scalars['Boolean']>;
  page_size?: Maybe<Scalars['Int']>;
};

export type Region = {
  __typename?: 'Region';
  /** The two-letter code for the region, such as TX for Texas. */
  code?: Maybe<Scalars['String']>;
  /** The unique ID for a `Region` object. */
  id?: Maybe<Scalars['Int']>;
  /** The name of the region, such as Texas. */
  name?: Maybe<Scalars['String']>;
};

/** Defines the input required to run the removeAmGiftCardFromCart mutation */
export type RemoveAmGiftCardFromCartInput = {
  /** The gift card code to be removed to the cart */
  am_gift_card_code: Scalars['String'];
  /** The unique ID that identifies the customer's cart */
  cart_id: Scalars['String'];
};

/** Defines the possible output for the removeGiftCardFromCart mutation */
export type RemoveAmGiftCardFromCartOutput = {
  __typename?: 'RemoveAmGiftCardFromCartOutput';
  /** Describes the contents of the specified shopping cart */
  cart: Cart;
};

/** Specifies the cart from which to remove a coupon. */
export type RemoveCouponFromCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
};

/** Contains details about the cart after removing a coupon. */
export type RemoveCouponFromCartOutput = {
  __typename?: 'RemoveCouponFromCartOutput';
  /** The cart after removing a coupon. */
  cart?: Maybe<Cart>;
};

/** Specifies which items to remove from the cart. */
export type RemoveItemFromCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** Deprecated. Use `cart_item_uid` instead. */
  cart_item_id?: Maybe<Scalars['Int']>;
  /** Required field. The unique ID for a `CartItemInterface` object. */
  cart_item_uid?: Maybe<Scalars['ID']>;
};

/** Contains details about the cart after removing an item. */
export type RemoveItemFromCartOutput = {
  __typename?: 'RemoveItemFromCartOutput';
  /** The cart after removing an item. */
  cart: Cart;
};

export type RemoveItemsFromCartInput = {
  cart_id: Scalars['String'];
  /** Required field. The unique ID for a `CartItemInterface` object */
  cart_items: Array<Maybe<CartItemUpdateInput>>;
};

/** Defines which products to remove from a compare list. */
export type RemoveProductsFromCompareListInput = {
  /** An array of product IDs to remove from the compare list. */
  products: Array<Maybe<Scalars['ID']>>;
  /** The unique identifier of the compare list to modify. */
  uid: Scalars['ID'];
};

/** Contains the customer's wish list and any errors encountered. */
export type RemoveProductsFromWishlistOutput = {
  __typename?: 'RemoveProductsFromWishlistOutput';
  /** An array of errors encountered while deleting products from a wish list. */
  user_errors: Array<Maybe<WishListUserInputError>>;
  /** Contains the wish list with after items were successfully deleted. */
  wishlist: Wishlist;
};

/** Contains the cart and any errors after adding products. */
export type ReorderItemsOutput = {
  __typename?: 'ReorderItemsOutput';
  /** Detailed information about the customer's cart. */
  cart: Cart;
  /** An array of reordering errors. */
  userInputErrors: Array<Maybe<CheckoutUserInputError>>;
};

/** Contains the result of a request to revoke a customer token. */
export type RevokeCustomerTokenOutput = {
  __typename?: 'RevokeCustomerTokenOutput';
  /** The result of a request to revoke a customer token. */
  result: Scalars['Boolean'];
};

/** Routable entities serve as the model for a rendered page. */
export type RoutableInterface = {
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
};

/** Contains details about a comment. */
export type SalesCommentItem = {
  __typename?: 'SalesCommentItem';
  /** The text of the message. */
  message: Scalars['String'];
  /** The timestamp of the comment. */
  timestamp: Scalars['String'];
};

export type SalesItemInterface = {
  __typename?: 'SalesItemInterface';
  /** The entered gift message for the order item */
  gift_message?: Maybe<GiftMessage>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  aheadworks_blog_post?: Maybe<SearchResultAheadworksBlogPost>;
  amasty_blog_post?: Maybe<SearchResultAmastyBlogPost>;
  amasty_faq_question?: Maybe<SearchResultAmastyFaqQuestion>;
  catalogsearch_fulltext?: Maybe<SearchResultMagentoCatalogProduct>;
  external_wordpress_post?: Maybe<SearchResultExternalWordpressPost>;
  magefan_blog_post?: Maybe<SearchResultMagefanBlogPost>;
  magento_catalog_attribute?: Maybe<SearchResultMagentoCatalogAttribute>;
  magento_catalog_attribute_2?: Maybe<SearchResultMagentoCatalogAttribute_2>;
  magento_catalog_attribute_3?: Maybe<SearchResultMagentoCatalogAttribute_3>;
  magento_catalog_attribute_4?: Maybe<SearchResultMagentoCatalogAttribute_4>;
  magento_catalog_attribute_5?: Maybe<SearchResultMagentoCatalogAttribute_5>;
  magento_catalog_category?: Maybe<SearchResultMagentoCatalogCategory>;
  magento_cms_page?: Maybe<SearchResultMagentoCmsPage>;
  mageplaza_blog_post?: Maybe<SearchResultMageplazaBlogPost>;
  mirasvit_kb_article?: Maybe<SearchResultMirasvitKbArticle>;
};

export type SearchResultAheadworksBlogPost = {
  __typename?: 'SearchResultAheadworksBlogPost';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<AheadworksBlogPost>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultAheadworksBlogPostItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultAmastyBlogPost = {
  __typename?: 'SearchResultAmastyBlogPost';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<AmastyBlogPost>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultAmastyBlogPostItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultAmastyFaqQuestion = {
  __typename?: 'SearchResultAmastyFaqQuestion';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<AmastyFaqQuestion>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultAmastyFaqQuestionItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultExternalWordpressPost = {
  __typename?: 'SearchResultExternalWordpressPost';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<ExternalWordpressPost>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultExternalWordpressPostItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMagefanBlogPost = {
  __typename?: 'SearchResultMagefanBlogPost';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<MagefanBlogPost>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMagefanBlogPostItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMagentoCatalogAttribute = {
  __typename?: 'SearchResultMagentoCatalogAttribute';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<AttributeOption>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMagentoCatalogAttributeItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMagentoCatalogAttribute_2 = {
  __typename?: 'SearchResultMagentoCatalogAttribute_2';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<AttributeOption>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMagentoCatalogAttribute_2ItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMagentoCatalogAttribute_3 = {
  __typename?: 'SearchResultMagentoCatalogAttribute_3';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<AttributeOption>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMagentoCatalogAttribute_3ItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMagentoCatalogAttribute_4 = {
  __typename?: 'SearchResultMagentoCatalogAttribute_4';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<AttributeOption>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMagentoCatalogAttribute_4ItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMagentoCatalogAttribute_5 = {
  __typename?: 'SearchResultMagentoCatalogAttribute_5';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<AttributeOption>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMagentoCatalogAttribute_5ItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMagentoCatalogCategory = {
  __typename?: 'SearchResultMagentoCatalogCategory';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<CategoryInterface>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMagentoCatalogCategoryItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMagentoCatalogProduct = {
  __typename?: 'SearchResultMagentoCatalogProduct';
  aggregations?: Maybe<Array<Maybe<Aggregation>>>;
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<ProductInterface>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMagentoCatalogProductItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  sort?: Maybe<ProductAttributeSortInput>;
  filter?: Maybe<ProductAttributeFilterInput>;
};

export type SearchResultMagentoCmsPage = {
  __typename?: 'SearchResultMagentoCmsPage';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<CmsPage>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMagentoCmsPageItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMageplazaBlogPost = {
  __typename?: 'SearchResultMageplazaBlogPost';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<MageplazaBlogPost>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMageplazaBlogPostItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

export type SearchResultMirasvitKbArticle = {
  __typename?: 'SearchResultMirasvitKbArticle';
  identifier?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<MirasvitKbArticle>>>;
  position?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};


export type SearchResultMirasvitKbArticleItemsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

/** Provides navigation for the query response. */
export type SearchResultPageInfo = {
  __typename?: 'SearchResultPageInfo';
  /** The specific page to return. */
  current_page?: Maybe<Scalars['Int']>;
  /** The maximum number of items to return per page of results. */
  page_size?: Maybe<Scalars['Int']>;
  /** The total number of pages in the response. */
  total_pages?: Maybe<Scalars['Int']>;
};

/** A string that contains search suggestion */
export type SearchSuggestion = {
  __typename?: 'SearchSuggestion';
  /** The search suggestion of existing product. */
  search: Scalars['String'];
};

export type SearchTerms = {
  __typename?: 'SearchTerms';
  num_results?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['String']>;
  query_id?: Maybe<Scalars['String']>;
  query_text?: Maybe<Scalars['String']>;
  redirect?: Maybe<Scalars['String']>;
};

/** Contains details about a selected bundle option. */
export type SelectedBundleOption = {
  __typename?: 'SelectedBundleOption';
  /** @deprecated Use `uid` instead */
  id: Scalars['Int'];
  /** The display name of the selected bundle product option. */
  label: Scalars['String'];
  /** The type of selected bundle product option. */
  type: Scalars['String'];
  /** The unique ID for a `SelectedBundleOption` object */
  uid: Scalars['ID'];
  /** An array of selected bundle option values. */
  values: Array<Maybe<SelectedBundleOptionValue>>;
};

/** Contains details about a value for a selected bundle option. */
export type SelectedBundleOptionValue = {
  __typename?: 'SelectedBundleOptionValue';
  /** Use `uid` instead */
  id: Scalars['Int'];
  /** The display name of the value for the selected bundle product option. */
  label: Scalars['String'];
  /** The price of the value for the selected bundle product option. */
  price: Scalars['Float'];
  /** The quantity of the value for the selected bundle product option. */
  quantity: Scalars['Float'];
  /** The unique ID for a `SelectedBundleOptionValue` object */
  uid: Scalars['ID'];
};

/** Contains details about a selected configurable option. */
export type SelectedConfigurableOption = {
  __typename?: 'SelectedConfigurableOption';
  /** The unique ID for a `ConfigurableProductOptions` object. */
  configurable_product_option_uid: Scalars['ID'];
  /** The unique ID for a `ConfigurableProductOptionsValues` object. */
  configurable_product_option_value_uid: Scalars['ID'];
  /** @deprecated Use `SelectedConfigurableOption.configurable_product_option_uid` instead. */
  id: Scalars['Int'];
  /** The display text for the option. */
  option_label: Scalars['String'];
  /** @deprecated Use `SelectedConfigurableOption.configurable_product_option_value_uid` instead. */
  value_id: Scalars['Int'];
  /** The display name of the selected configurable option. */
  value_label: Scalars['String'];
};

/** Identifies a customized product that has been placed in a cart. */
export type SelectedCustomizableOption = {
  __typename?: 'SelectedCustomizableOption';
  /** The unique ID for a specific `CustomizableOptionInterface` object, such as a `CustomizableFieldOption`, `CustomizableFileOption`, or `CustomizableAreaOption` object. */
  customizable_option_uid: Scalars['ID'];
  /** @deprecated Use `SelectedCustomizableOption.customizable_option_uid` instead. */
  id: Scalars['Int'];
  /** Indicates whether the customizable option is required. */
  is_required: Scalars['Boolean'];
  /** The display name of the selected customizable option. */
  label: Scalars['String'];
  /** A value indicating the order to display this option. */
  sort_order: Scalars['Int'];
  /** The type of `CustomizableOptionInterface` object. */
  type: Scalars['String'];
  /** An array of selectable values. */
  values: Array<Maybe<SelectedCustomizableOptionValue>>;
};

/** Identifies the value of the selected customized option. */
export type SelectedCustomizableOptionValue = {
  __typename?: 'SelectedCustomizableOptionValue';
  /** The unique ID for a value object that corresponds to the object represented by the `customizable_option_uid` attribute. */
  customizable_option_value_uid: Scalars['ID'];
  /** @deprecated Use `SelectedCustomizableOptionValue.customizable_option_value_uid` instead. */
  id: Scalars['Int'];
  /** The display name of the selected value. */
  label: Scalars['String'];
  /** The price of the selected customizable value. */
  price: CartItemSelectedOptionValuePrice;
  /** The text identifying the selected value. */
  value: Scalars['String'];
};

/** Describes the payment method the shopper selected. */
export type SelectedPaymentMethod = {
  __typename?: 'SelectedPaymentMethod';
  /** The payment method code. */
  code: Scalars['String'];
  /** The purchase order number. */
  purchase_order_number?: Maybe<Scalars['String']>;
  /** The payment method title. */
  title: Scalars['String'];
};

/** Contains details about the selected shipping method and carrier. */
export type SelectedShippingMethod = {
  __typename?: 'SelectedShippingMethod';
  /** The cost of shipping using this shipping method. */
  amount: Money;
  /** @deprecated The field should not be used on the storefront. */
  base_amount?: Maybe<Money>;
  /** A string that identifies a commercial carrier or an offline shipping method. */
  carrier_code: Scalars['String'];
  /** The label for the carrier code. */
  carrier_title: Scalars['String'];
  /** A shipping method code associated with a carrier. */
  method_code: Scalars['String'];
  /** The label for the method code. */
  method_title: Scalars['String'];
};

/** Defines the referenced product and the email sender and recipients. */
export type SendEmailToFriendInput = {
  /** The ID of the product that the sender is referencing. */
  product_id: Scalars['Int'];
  /** An array containing information about each recipient. */
  recipients: Array<Maybe<SendEmailToFriendRecipientInput>>;
  /** Information about the customer and the content of the message. */
  sender: SendEmailToFriendSenderInput;
};

/** Contains information about the sender and recipients. */
export type SendEmailToFriendOutput = {
  __typename?: 'SendEmailToFriendOutput';
  /** An array containing information about each recipient. */
  recipients?: Maybe<Array<Maybe<SendEmailToFriendRecipient>>>;
  /** Information about the customer and the content of the message. */
  sender?: Maybe<SendEmailToFriendSender>;
};

/** An output object that contains information about the recipient. */
export type SendEmailToFriendRecipient = {
  __typename?: 'SendEmailToFriendRecipient';
  /** The email address of the recipient. */
  email: Scalars['String'];
  /** The name of the recipient. */
  name: Scalars['String'];
};

/** Contains details about a recipient. */
export type SendEmailToFriendRecipientInput = {
  /** The email address of the recipient. */
  email: Scalars['String'];
  /** The name of the recipient. */
  name: Scalars['String'];
};

/** An output object that contains information about the sender. */
export type SendEmailToFriendSender = {
  __typename?: 'SendEmailToFriendSender';
  /** The email address of the sender. */
  email: Scalars['String'];
  /** The text of the message to be sent. */
  message: Scalars['String'];
  /** The name of the sender. */
  name: Scalars['String'];
};

/** Contains details about the sender. */
export type SendEmailToFriendSenderInput = {
  /** The email address of the sender. */
  email: Scalars['String'];
  /** The text of the message to be sent. */
  message: Scalars['String'];
  /** The name of the sender. */
  name: Scalars['String'];
};

/** Contains details about the configuration of the Email to a Friend feature. */
export type SendFriendConfiguration = {
  __typename?: 'SendFriendConfiguration';
  /** Indicates whether the Email to a Friend feature is enabled. */
  enabled_for_customers: Scalars['Boolean'];
  /** Indicates whether the Email to a Friend feature is enabled for guests. */
  enabled_for_guests: Scalars['Boolean'];
};

/** Sets the billing address. */
export type SetBillingAddressOnCartInput = {
  /** The billing address. */
  billing_address: BillingAddressInput;
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
};

/** Contains details about the cart after setting the billing address. */
export type SetBillingAddressOnCartOutput = {
  __typename?: 'SetBillingAddressOnCartOutput';
  /** The cart after setting the billing address. */
  cart: Cart;
};

export type SetCustomerLinkOutput = {
  __typename?: 'SetCustomerLinkOutput';
  customer_bearer_token?: Maybe<Scalars['String']>;
  customer_email?: Maybe<Scalars['String']>;
  customer_firstname?: Maybe<Scalars['String']>;
  customer_id?: Maybe<Scalars['String']>;
  customer_last?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Defines the guest email and cart. */
export type SetGuestEmailOnCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** The email address of the guest. */
  email: Scalars['String'];
};

/** Contains details about the cart after setting the email of a guest. */
export type SetGuestEmailOnCartOutput = {
  __typename?: 'SetGuestEmailOnCartOutput';
  /** The cart after setting the guest email. */
  cart: Cart;
};

/** Applies a payment method to the quote. */
export type SetPaymentMethodAndPlaceOrderInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** The payment method data to apply to the cart. */
  payment_method: PaymentMethodInput;
};

/** Applies a payment method to the cart. */
export type SetPaymentMethodOnCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** The payment method data to apply to the cart. */
  payment_method: PaymentMethodInput;
};

/** Contains details about the cart after setting the payment method. */
export type SetPaymentMethodOnCartOutput = {
  __typename?: 'SetPaymentMethodOnCartOutput';
  /** The cart after setting the payment method. */
  cart: Cart;
};

/** Specifies an array of addresses to use for shipping. */
export type SetShippingAddressesOnCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** An array of shipping addresses. */
  shipping_addresses: Array<Maybe<ShippingAddressInput>>;
};

/** Contains details about the cart after setting the shipping addresses. */
export type SetShippingAddressesOnCartOutput = {
  __typename?: 'SetShippingAddressesOnCartOutput';
  /** The cart after setting the shipping addresses. */
  cart: Cart;
};

/** Applies one or shipping methods to the cart. */
export type SetShippingMethodsOnCartInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** An array of shipping methods. */
  shipping_methods: Array<Maybe<ShippingMethodInput>>;
};

/** Contains details about the cart after setting the shipping methods. */
export type SetShippingMethodsOnCartOutput = {
  __typename?: 'SetShippingMethodsOnCartOutput';
  /** The cart after setting the shipping methods. */
  cart: Cart;
};

/** Defines whether bundle items must be shipped together. */
export enum ShipBundleItemsEnum {
  Together = 'TOGETHER',
  Separately = 'SEPARATELY'
}

export type ShipmentItem = ShipmentItemInterface & {
  __typename?: 'ShipmentItem';
  /** The unique ID for a `ShipmentItemInterface` object. */
  id: Scalars['ID'];
  /** The order item associated with the shipment item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of shipped items. */
  quantity_shipped: Scalars['Float'];
};

/** Order shipment item details. */
export type ShipmentItemInterface = {
  /** The unique ID for a `ShipmentItemInterface` object. */
  id: Scalars['ID'];
  /** The order item associated with the shipment item. */
  order_item?: Maybe<OrderItemInterface>;
  /** The name of the base product. */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price for the base product. */
  product_sale_price: Money;
  /** The SKU of the base product. */
  product_sku: Scalars['String'];
  /** The number of shipped items. */
  quantity_shipped: Scalars['Float'];
};

/** Contains order shipment tracking details. */
export type ShipmentTracking = {
  __typename?: 'ShipmentTracking';
  /** The shipping carrier for the order delivery. */
  carrier: Scalars['String'];
  /** The tracking number of the order shipment. */
  number?: Maybe<Scalars['String']>;
  /** The shipment tracking title. */
  title: Scalars['String'];
};

/** Defines a single shipping address. */
export type ShippingAddressInput = {
  /** Defines a shipping address. */
  address?: Maybe<CartAddressInput>;
  /** An ID from the customer's address book that uniquely identifies the address to be used for shipping. */
  customer_address_id?: Maybe<Scalars['Int']>;
  /** Text provided by the shopper. */
  customer_notes?: Maybe<Scalars['String']>;
  /** The code of Pickup Location which will be used for In-Store Pickup. */
  pickup_location_code?: Maybe<Scalars['String']>;
};

/** Contains shipping addresses and methods. */
export type ShippingCartAddress = CartAddressInterface & {
  __typename?: 'ShippingCartAddress';
  /** An array that lists the shipping methods that can be applied to the cart. */
  available_shipping_methods?: Maybe<Array<Maybe<AvailableShippingMethod>>>;
  /** @deprecated Use `cart_items_v2` instead. */
  cart_items?: Maybe<Array<Maybe<CartItemQuantity>>>;
  /** An array that lists the items in the cart. */
  cart_items_v2?: Maybe<Array<Maybe<CartItemInterface>>>;
  /** The city specified for the billing or shipping address. */
  city: Scalars['String'];
  /** The company specified for the billing or shipping address. */
  company?: Maybe<Scalars['String']>;
  /** An object containing the country label and code. */
  country: CartAddressCountry;
  /** Text provided by the shopper. */
  customer_notes?: Maybe<Scalars['String']>;
  /** The first name of the customer or guest. */
  firstname: Scalars['String'];
  /** @deprecated This information should not be exposed on the frontend. */
  items_weight?: Maybe<Scalars['Float']>;
  /** The last name of the customer or guest. */
  lastname: Scalars['String'];
  pickup_location_code?: Maybe<Scalars['String']>;
  /** The ZIP or postal code of the billing or shipping address. */
  postcode?: Maybe<Scalars['String']>;
  /** An object containing the region label and code. */
  region?: Maybe<CartAddressRegion>;
  /** An object that describes the selected shipping method. */
  selected_shipping_method?: Maybe<SelectedShippingMethod>;
  /** An array containing the street for the billing or shipping address. */
  street: Array<Maybe<Scalars['String']>>;
  /** The telephone number for the billing or shipping address. */
  telephone?: Maybe<Scalars['String']>;
};

/** Defines an individual shipping discount. This discount can be applied to shipping. */
export type ShippingDiscount = {
  __typename?: 'ShippingDiscount';
  /** The amount of the discount. */
  amount: Money;
};

/** Contains details about shipping and handling costs. */
export type ShippingHandling = {
  __typename?: 'ShippingHandling';
  /** The shipping amount, excluding tax. */
  amount_excluding_tax?: Maybe<Money>;
  /** The shipping amount, including tax. */
  amount_including_tax?: Maybe<Money>;
  /** The applied discounts to the shipping. */
  discounts?: Maybe<Array<Maybe<ShippingDiscount>>>;
  /** Details about taxes applied for shipping. */
  taxes?: Maybe<Array<Maybe<TaxItem>>>;
  /** The total amount for shipping. */
  total_amount: Money;
};

/** Defines the shipping carrier and method. */
export type ShippingMethodInput = {
  /** A string that identifies a commercial carrier or an offline delivery method. */
  carrier_code: Scalars['String'];
  /** A string that indicates which service a commercial carrier will use to ship items. For offline delivery methods, this value is similar to the label displayed on the checkout page. */
  method_code: Scalars['String'];
};

/** An implementation for simple product cart items. */
export type SimpleCartItem = CartItemInterface & {
  __typename?: 'SimpleCartItem';
  /** An array containing the customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  date_picker?: Maybe<Scalars['String']>;
  delivery_warning?: Maybe<Scalars['String']>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** The entered gift message for the cart item */
  gift_message?: Maybe<GiftMessage>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String'];
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID'];
};

/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProduct = ProductInterface & RoutableInterface & PhysicalProductInterface & CustomizableProductInterface & {
  __typename?: 'SimpleProduct';
  /** Add to cart url. */
  add_to_cart_url?: Maybe<Scalars['String']>;
  /** Add to wishlist information. */
  add_to_wishlist?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  additional_features?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  assembly_type?: Maybe<Scalars['Int']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_colours?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_sizes?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  back_stock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  backstock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  barcode?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  base_slat_type?: Maybe<Scalars['Int']>;
  /** Custom data in bedkingdom website */
  bed_data?: Maybe<BedData>;
  /** @deprecated Use the `custom_attributes` field instead. */
  benifts?: Maybe<Scalars['String']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  chair_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  colour?: Maybe<Scalars['String']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  delivery?: Maybe<Scalars['Int']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dimentions?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dining_chairs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_drawers?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_fabric?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  exchange_return_upgrade?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  feet_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  filling_type_search?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  fold_mechanism?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  free_delivery?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  furniture_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ggiftcard_amount_config?: Maybe<Scalars['String']>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gtin?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  guarantee?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  headboard_included?: Maybe<Scalars['Int']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ladder?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  leg_diameter?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  length?: Maybe<Scalars['String']>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  matching_headboard?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  material_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_bundle?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_depth?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_tention?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_turn?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_type?: Maybe<Scalars['Int']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mpn?: Maybe<Scalars['String']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  nocupboards?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  number_of_springs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  numberdrawers?: Maybe<Scalars['Int']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  optional_extras?: Maybe<Scalars['Int']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Product url. */
  product_url?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ranges?: Maybe<Scalars['Int']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  room_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  seat_type?: Maybe<Scalars['Int']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  size?: Maybe<Scalars['Int']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  split?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type_search?: Maybe<Scalars['Int']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  stompa_colours?: Maybe<Scalars['Int']>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_top_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  temperature_control_fabric?: Maybe<Scalars['Int']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  top_bunk_size?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_options?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_size?: Maybe<Scalars['Int']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  udropship_vendor?: Maybe<Scalars['Int']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  wardrobe_doors?: Maybe<Scalars['Int']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
  /** The weight of the item, in units defined by the store. */
  weight?: Maybe<Scalars['Float']>;
};


/** Defines a simple product, which is tangible and is usually sold in single units or in fixed quantities. */
export type SimpleProductReviewsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

/** Defines a single product to add to the cart. */
export type SimpleProductCartItemInput = {
  /** An array that defines customizable options for the product. */
  customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>;
  /** An object containing the `sku`, `quantity`, and other relevant information about the product. */
  data: CartItemInput;
};

/** Contains a simple product wish list item. */
export type SimpleWishlistItem = WishlistItemInterface & {
  __typename?: 'SimpleWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float'];
};

export type SliderConfig = {
  __typename?: 'SliderConfig';
  URLhashListener?: Maybe<Scalars['String']>;
  autoHeight?: Maybe<Scalars['String']>;
  autoplay?: Maybe<Scalars['String']>;
  autoplayHoverPause?: Maybe<Scalars['String']>;
  autoplayTimeout?: Maybe<Scalars['String']>;
  center?: Maybe<Scalars['String']>;
  dots?: Maybe<Scalars['String']>;
  dotsEach?: Maybe<Scalars['String']>;
  dotsSpeed?: Maybe<Scalars['String']>;
  items?: Maybe<Scalars['String']>;
  items_brk1?: Maybe<Scalars['String']>;
  items_brk2?: Maybe<Scalars['String']>;
  items_brk3?: Maybe<Scalars['String']>;
  items_brk4?: Maybe<Scalars['String']>;
  lazyLoad?: Maybe<Scalars['String']>;
  loop?: Maybe<Scalars['String']>;
  margin?: Maybe<Scalars['String']>;
  merge?: Maybe<Scalars['String']>;
  nav?: Maybe<Scalars['String']>;
  navSpeed?: Maybe<Scalars['String']>;
  nav_brk1?: Maybe<Scalars['String']>;
  nav_brk2?: Maybe<Scalars['String']>;
  nav_brk3?: Maybe<Scalars['String']>;
  nav_brk4?: Maybe<Scalars['String']>;
  rtl?: Maybe<Scalars['String']>;
  scheduled_ajax?: Maybe<Scalars['String']>;
  show_title?: Maybe<Scalars['String']>;
  stagePadding?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  thumbs?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  transition?: Maybe<Scalars['String']>;
  wrap_link?: Maybe<Scalars['String']>;
};

/** Indicates whether to return results in ascending or descending order. */
export enum SortEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Defines a possible sort field. */
export type SortField = {
  __typename?: 'SortField';
  /** The label of the sort field. */
  label?: Maybe<Scalars['String']>;
  /** The attribute code of the sort field. */
  value?: Maybe<Scalars['String']>;
};

/** Contains a default value for sort fields and all available sort fields. */
export type SortFields = {
  __typename?: 'SortFields';
  /** The default sort field value. */
  default?: Maybe<Scalars['String']>;
  /** An array of possible sort fields. */
  options?: Maybe<Array<Maybe<SortField>>>;
};

export type SortingOrder = {
  __typename?: 'SortingOrder';
  /** Order code. */
  attribute: Scalars['String'];
  /** Order id. */
  id: Scalars['String'];
  sortDirection: Scalars['String'];
  /** Order label. */
  text: Scalars['String'];
};

/** Contains information about a store's configuration. */
export type StoreConfig = {
  __typename?: 'StoreConfig';
  /** Contains scripts that must be included in the HTML before the closing `<body>` tag. */
  absolute_footer?: Maybe<Scalars['String']>;
  /** Indicates whether guest users can write product reviews. Possible values: 1 (Yes) and 0 (No). */
  allow_guests_to_write_product_reviews?: Maybe<Scalars['String']>;
  /** The value of the Allow Gift Messages for Order Items option */
  allow_items?: Maybe<Scalars['String']>;
  /** The value of the Allow Gift Messages on Order Level option */
  allow_order?: Maybe<Scalars['String']>;
  /** Amasty Brands Menu Item Label. */
  amshopby_brand_general_menu_item_label?: Maybe<Scalars['String']>;
  /** Amasty Add Brands Link to Top Menu. */
  amshopby_brand_general_topmenu_enabled?: Maybe<Scalars['Boolean']>;
  /** Amasty Brand Listing Logo Height. */
  amshopby_brand_listing_brand_logo_height?: Maybe<Scalars['Int']>;
  /** Amasty Brand Listing Logo Width. */
  amshopby_brand_listing_brand_logo_width?: Maybe<Scalars['Int']>;
  /** Amasty Product Page Brand Logo Height. */
  amshopby_brand_product_page_height?: Maybe<Scalars['Int']>;
  /** Amasty Product Page Brand Logo Width. */
  amshopby_brand_product_page_width?: Maybe<Scalars['Int']>;
  /** Leave the Single-Select Filter Visible after Selection. */
  amshopby_general_keep_single_choice_visible?: Maybe<Scalars['Boolean']>;
  /** Slider Style. */
  amshopby_general_unfolded_options_state?: Maybe<Scalars['Int']>;
  /** Slider Style. */
  amshopby_slider_slider_style?: Maybe<Scalars['String']>;
  /** Indicates whether to enable autocomplete on login and forgot password forms. */
  autocomplete_on_storefront?: Maybe<Scalars['Boolean']>;
  /** The base currency code. */
  base_currency_code?: Maybe<Scalars['String']>;
  /** A fully-qualified URL that is used to create relative links to the `base_url`. */
  base_link_url?: Maybe<Scalars['String']>;
  /** The fully-qualified URL that specifies the location of media files. */
  base_media_url?: Maybe<Scalars['String']>;
  /** The fully-qualified URL that specifies the location of static view files. */
  base_static_url?: Maybe<Scalars['String']>;
  /** The store’s fully-qualified base URL. */
  base_url?: Maybe<Scalars['String']>;
  /** The default sort order of the search results list. */
  catalog_default_sort_by?: Maybe<Scalars['String']>;
  /** Corresponds to the 'Display Prices In Product Lists' field in the Admin. It indicates how FPT information is displayed on category pages. */
  category_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
  /** The suffix applied to category pages, such as `.htm` or `.html`. */
  category_url_suffix?: Maybe<Scalars['String']>;
  /** Indicates whether only specific countries can use this payment method. */
  check_money_order_enable_for_specific_countries?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the Check/Money Order payment method is enabled. */
  check_money_order_enabled?: Maybe<Scalars['Boolean']>;
  /** The name of the party to whom the check must be payable. */
  check_money_order_make_check_payable_to?: Maybe<Scalars['String']>;
  /** The maximum order amount required to qualify for the Check/Money Order payment method. */
  check_money_order_max_order_total?: Maybe<Scalars['String']>;
  /** The minimum order amount required to qualify for the Check/Money Order payment method. */
  check_money_order_min_order_total?: Maybe<Scalars['String']>;
  /** The status of new orders placed using the Check/Money Order payment method. */
  check_money_order_new_order_status?: Maybe<Scalars['String']>;
  /** A comma-separated list of specific countries allowed to use the Check/Money Order payment method. */
  check_money_order_payment_from_specific_countries?: Maybe<Scalars['String']>;
  /** The full street address or PO Box where the checks are mailed. */
  check_money_order_send_check_to?: Maybe<Scalars['String']>;
  /** A number indicating the position of the Check/Money Order payment method in the list of available payment methods during checkout. */
  check_money_order_sort_order?: Maybe<Scalars['Int']>;
  /** The title of the Check/Money Order payment method displayed on the storefront. */
  check_money_order_title?: Maybe<Scalars['String']>;
  /** The name of the CMS page that identifies the home page for the store. */
  cms_home_page?: Maybe<Scalars['String']>;
  /** A specific CMS page that displays when cookies are not enabled for the browser. */
  cms_no_cookies?: Maybe<Scalars['String']>;
  /** A specific CMS page that displays when a 404 'Page Not Found' error occurs. */
  cms_no_route?: Maybe<Scalars['String']>;
  /**
   * A code assigned to the store to identify it.
   * @deprecated Use `store_code` instead.
   */
  code?: Maybe<Scalars['String']>;
  /** Indicates whether the `parent` or child (`itself`) thumbnail should be used in the cart for configurable products. */
  configurable_thumbnail_source?: Maybe<Scalars['String']>;
  /** The copyright statement that appears at the bottom of each page. */
  copyright?: Maybe<Scalars['String']>;
  /** The description that provides a summary of your site for search engine listings. It should not be more than 160 characters in length. */
  default_description?: Maybe<Scalars['String']>;
  /** The default display currency code. */
  default_display_currency_code?: Maybe<Scalars['String']>;
  /** A series of keywords that describe your store, each separated by a comma. */
  default_keywords?: Maybe<Scalars['String']>;
  /** The title that appears at the title bar of each page when viewed in a browser. */
  default_title?: Maybe<Scalars['String']>;
  /** Controls the display of the demo store notice at the top of the page. Options: 0 (No) or 1 (Yes). */
  demonotice?: Maybe<Scalars['Int']>;
  /** Extended Config Data - firecheckout/general/layout */
  firecheckout_design_layout?: Maybe<Scalars['String']>;
  /** Extended Config Data - firecheckout/design/page_layout */
  firecheckout_design_page_layout?: Maybe<Scalars['String']>;
  /** Extended Config Data - firecheckout/design/place_order_button_position */
  firecheckout_design_place_order_button_position?: Maybe<Scalars['String']>;
  /** Extended Config Data - firecheckout/general/enabled */
  firecheckout_general_enabled?: Maybe<Scalars['Int']>;
  /** The landing page that is associated with the base URL. */
  front?: Maybe<Scalars['String']>;
  /** The default number of products per page in Grid View. */
  grid_per_page?: Maybe<Scalars['Int']>;
  /** A list of numbers that define how many products can be displayed in Grid View. */
  grid_per_page_values?: Maybe<Scalars['String']>;
  /** Scripts that must be included in the HTML before the closing `<head>` tag. */
  head_includes?: Maybe<Scalars['String']>;
  /** The small graphic image (favicon) that appears in the address bar and tab of the browser. */
  head_shortcut_icon?: Maybe<Scalars['String']>;
  /** The path to the logo that appears in the header. */
  header_logo_src?: Maybe<Scalars['String']>;
  /**
   * The ID number assigned to the store.
   * @deprecated Use `store_code` instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** Indicates whether the store view has been designated as the default within the store group. */
  is_default_store?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the store group has been designated as the default within the website. */
  is_default_store_group?: Maybe<Scalars['Boolean']>;
  /** The format of the search results list. */
  list_mode?: Maybe<Scalars['String']>;
  /** The default number of products per page in List View. */
  list_per_page?: Maybe<Scalars['Int']>;
  /** A list of numbers that define how many products can be displayed in List View. */
  list_per_page_values?: Maybe<Scalars['String']>;
  /** The store locale. */
  locale?: Maybe<Scalars['String']>;
  /** The Alt text that is associated with the logo. */
  logo_alt?: Maybe<Scalars['String']>;
  /** The height of the logo image, in pixels. */
  logo_height?: Maybe<Scalars['Int']>;
  /** The width of the logo image, in pixels. */
  logo_width?: Maybe<Scalars['Int']>;
  /** Indicates whether wishlists are enabled (1) or disabled (0). */
  magento_wishlist_general_is_enabled?: Maybe<Scalars['String']>;
  /** The minimum number of characters required for a valid password. */
  minimum_password_length?: Maybe<Scalars['String']>;
  /** The default page that displays when a 404 'Page not Found' error occurs. */
  no_route?: Maybe<Scalars['String']>;
  /** Payflow Pro vault status. */
  payment_payflowpro_cc_vault_active?: Maybe<Scalars['String']>;
  /** Corresponds to the 'Display Prices On Product View Page' field in the Admin. It indicates how FPT information is displayed on product pages. */
  product_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
  /** Indicates whether product reviews are enabled. Possible values: 1 (Yes) and 0 (No). */
  product_reviews_enabled?: Maybe<Scalars['String']>;
  /** The suffix applied to product pages, such as `.htm` or `.html`. */
  product_url_suffix?: Maybe<Scalars['String']>;
  /** The number of different character classes (lowercase, uppercase, digits, special characters) required in a password. */
  required_character_classes_number?: Maybe<Scalars['String']>;
  /**
   * The ID of the root category.
   * @deprecated Use `root_category_uid` instead.
   */
  root_category_id?: Maybe<Scalars['Int']>;
  /** The unique ID for a `CategoryInterface` object. */
  root_category_uid?: Maybe<Scalars['ID']>;
  /** Corresponds to the 'Display Prices In Sales Modules' field in the Admin. It indicates how FPT information is displayed on cart, checkout, and order pages. */
  sales_fixed_product_tax_display_setting?: Maybe<FixedProductTaxDisplaySettings>;
  /** A secure fully-qualified URL that is used to create relative links to the `base_url`. */
  secure_base_link_url?: Maybe<Scalars['String']>;
  /** The secure fully-qualified URL that specifies the location of media files. */
  secure_base_media_url?: Maybe<Scalars['String']>;
  /** The secure fully-qualified URL that specifies the location of static view files. */
  secure_base_static_url?: Maybe<Scalars['String']>;
  /** The store’s fully-qualified secure base URL. */
  secure_base_url?: Maybe<Scalars['String']>;
  /** Email to a Friend configuration. */
  send_friend?: Maybe<SendFriendConfiguration>;
  /** Indicates whether a breadcrumb trail appears on all CMS pages in the catalog. 0 (No) or 1 (Yes). */
  show_cms_breadcrumbs?: Maybe<Scalars['Int']>;
  /** The unique ID of the store view. In the Admin, this is called the Store View Code. When making a GraphQL call, assign this value to the `Store` header to provide the scope. */
  store_code?: Maybe<Scalars['ID']>;
  /** The unique ID assigned to the store group. In the Admin, this is called the Store Name. */
  store_group_code?: Maybe<Scalars['ID']>;
  /** The label assigned to the store group. */
  store_group_name?: Maybe<Scalars['String']>;
  /** The label assigned to the store view. */
  store_name?: Maybe<Scalars['String']>;
  /** The store view sort order. */
  store_sort_order?: Maybe<Scalars['Int']>;
  /** The time zone of the store. */
  timezone?: Maybe<Scalars['String']>;
  /** A prefix that appears before the title to create a two- or three-part title. */
  title_prefix?: Maybe<Scalars['String']>;
  /** The character that separates the category name and subcategory in the browser title bar. */
  title_separator?: Maybe<Scalars['String']>;
  /** A suffix that appears after the title to create a two- or three-part title. */
  title_suffix?: Maybe<Scalars['String']>;
  /** Indicates whether the store code should be used in the URL. */
  use_store_in_url?: Maybe<Scalars['Boolean']>;
  /** The unique ID for the website. */
  website_code?: Maybe<Scalars['ID']>;
  /**
   * The ID number assigned to the website store.
   * @deprecated The field should not be used on the storefront.
   */
  website_id?: Maybe<Scalars['Int']>;
  /** The label assigned to the website. */
  website_name?: Maybe<Scalars['String']>;
  /** The unit of weight. */
  weight_unit?: Maybe<Scalars['String']>;
  /** Text that appears in the header of the page and includes the name of the logged in customer. */
  welcome?: Maybe<Scalars['String']>;
  /** Indicates whether only specific countries can use this payment method. */
  zero_subtotal_enable_for_specific_countries?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the Zero Subtotal payment method is enabled. */
  zero_subtotal_enabled?: Maybe<Scalars['Boolean']>;
  /** The status of new orders placed using the Zero Subtotal payment method. */
  zero_subtotal_new_order_status?: Maybe<Scalars['String']>;
  /** When the new order status is 'Processing', this can be set to `authorize_capture` to automatically invoice all items that have a zero balance. */
  zero_subtotal_payment_action?: Maybe<Scalars['String']>;
  /** A comma-separated list of specific countries allowed to use the Zero Subtotal payment method. */
  zero_subtotal_payment_from_specific_countries?: Maybe<Scalars['String']>;
  /** A number indicating the position of the Zero Subtotal payment method in the list of available payment methods during checkout. */
  zero_subtotal_sort_order?: Maybe<Scalars['Int']>;
  /** The title of the Zero Subtotal payment method displayed on the storefront. */
  zero_subtotal_title?: Maybe<Scalars['String']>;
};

/** Indicates where an attribute can be displayed. */
export type StorefrontProperties = {
  __typename?: 'StorefrontProperties';
  /** The relative position of the attribute in the layered navigation block. */
  position?: Maybe<Scalars['Int']>;
  /** Indicates whether the attribute is filterable with results, without results, or not at all. */
  use_in_layered_navigation?: Maybe<UseInLayeredNavigationOptions>;
  /** Indicates whether the attribute is displayed in product listings. */
  use_in_product_listing?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the attribute can be used in layered navigation on search results pages. */
  use_in_search_results_layered_navigation?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the attribute is displayed on product pages. */
  visible_on_catalog_pages?: Maybe<Scalars['Boolean']>;
};

export type StripePaymentsInput = {
  /** Stripe.js generated payment method token */
  cc_stripejs_token: Scalars['String'];
  /** Specify whether the payment method should be saved */
  save_payment_method?: Maybe<Scalars['Boolean']>;
};

/** Contains the result of the `subscribeEmailToNewsletter` operation. */
export type SubscribeEmailToNewsletterOutput = {
  __typename?: 'SubscribeEmailToNewsletterOutput';
  /** The status of the subscription request. */
  status?: Maybe<SubscriptionStatusesEnum>;
};

/** Indicates the status of the request. */
export enum SubscriptionStatusesEnum {
  NotActive = 'NOT_ACTIVE',
  Subscribed = 'SUBSCRIBED',
  Unsubscribed = 'UNSUBSCRIBED',
  Unconfirmed = 'UNCONFIRMED'
}

/** Describes the swatch type and a value. */
export type SwatchData = {
  __typename?: 'SwatchData';
  /** The type of swatch filter item: 1 - text; 2 - image. */
  type?: Maybe<Scalars['String']>;
  /** The value for the swatch item. It could be text or an image link. */
  value?: Maybe<Scalars['String']>;
};

export type SwatchDataInterface = {
  /** The value can be represented as color (HEX code), image link, or text. */
  value?: Maybe<Scalars['String']>;
};

export type SwatchLayerFilterItem = LayerFilterItemInterface & SwatchLayerFilterItemInterface & {
  __typename?: 'SwatchLayerFilterItem';
  /**
   * The count of items per filter.
   * @deprecated Use `AggregationOption.count` instead.
   */
  items_count?: Maybe<Scalars['Int']>;
  /**
   * The label for a filter.
   * @deprecated Use `AggregationOption.label` instead.
   */
  label?: Maybe<Scalars['String']>;
  /** Data required to render a swatch filter item. */
  swatch_data?: Maybe<SwatchData>;
  /**
   * The value of a filter request variable to be used in query.
   * @deprecated Use `AggregationOption.value` instead.
   */
  value_string?: Maybe<Scalars['String']>;
};

export type SwatchLayerFilterItemInterface = {
  /** Data required to render a swatch filter item. */
  swatch_data?: Maybe<SwatchData>;
};

/** Contains tax item details. */
export type TaxItem = {
  __typename?: 'TaxItem';
  /** The amount of tax applied to the item. */
  amount: Money;
  /** The rate used to calculate the tax. */
  rate: Scalars['Float'];
  /** A title that describes the tax. */
  title: Scalars['String'];
};

export type TextSwatchData = SwatchDataInterface & {
  __typename?: 'TextSwatchData';
  /** The value can be represented as color (HEX code), image link, or text. */
  value?: Maybe<Scalars['String']>;
};

/** Defines a price based on the quantity purchased. */
export type TierPrice = {
  __typename?: 'TierPrice';
  /** The price discount that this tier represents. */
  discount?: Maybe<ProductDiscount>;
  /** The price of the product at this tier. */
  final_price?: Maybe<Money>;
  /** The minimum number of items that must be purchased to qualify for this price tier. */
  quantity?: Maybe<Scalars['Float']>;
};

export type TrustpilotAttachmentSummary = {
  __typename?: 'TrustpilotAttachmentSummary';
  attachment_id?: Maybe<Scalars['String']>;
  processed_files?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['Int']>;
  review_id?: Maybe<Scalars['String']>;
};

export type TrustpilotAttributes = {
  __typename?: 'TrustpilotAttributes';
  quality?: Maybe<Scalars['String']>;
  value_for_money?: Maybe<Scalars['String']>;
};

export type TrustpilotBusinessReviews = {
  __typename?: 'TrustpilotBusinessReviews';
  company_response?: Maybe<Scalars['String']>;
  consumer_display_name?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  review_url?: Maybe<Scalars['String']>;
  stars?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type TrustpilotBusinessReviewsResponse = {
  __typename?: 'TrustpilotBusinessReviewsResponse';
  display_name?: Maybe<Scalars['String']>;
  number_of_reviews?: Maybe<TrustpilotBusinessReviewsSummary>;
  reviews?: Maybe<Array<Maybe<TrustpilotBusinessReviews>>>;
  stars?: Maybe<Scalars['String']>;
  trust_score?: Maybe<Scalars['String']>;
  website_url?: Maybe<Scalars['String']>;
};

export type TrustpilotBusinessReviewsSummary = {
  __typename?: 'TrustpilotBusinessReviewsSummary';
  five_stars?: Maybe<Scalars['Int']>;
  four_stars?: Maybe<Scalars['Int']>;
  one_star?: Maybe<Scalars['Int']>;
  three_stars?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  two_stars?: Maybe<Scalars['Int']>;
};

export type TrustpilotProductReviews = {
  __typename?: 'TrustpilotProductReviews';
  attributes?: Maybe<Scalars['String']>;
  consumer_display_name?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['Int']>;
  review_id?: Maybe<Scalars['String']>;
  stars?: Maybe<Scalars['Int']>;
};

export type TrustpilotProductReviewsDetail = {
  __typename?: 'TrustpilotProductReviewsDetail';
  trustpilot_attachment_summary?: Maybe<Array<Maybe<TrustpilotAttachmentSummary>>>;
  trustpilot_product_reviews?: Maybe<Array<Maybe<TrustpilotProductReviews>>>;
};

export type TrustpilotProductReviewsSummary = {
  __typename?: 'TrustpilotProductReviewsSummary';
  attributes?: Maybe<TrustpilotAttributes>;
  five_stars?: Maybe<Scalars['Int']>;
  four_stars?: Maybe<Scalars['Int']>;
  one_star?: Maybe<Scalars['Int']>;
  product_id?: Maybe<Scalars['Int']>;
  stars_average?: Maybe<Scalars['String']>;
  three_stars?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  two_stars?: Maybe<Scalars['Int']>;
};

/** Modifies the specified items in the cart. */
export type UpdateCartItemsInput = {
  /** The unique ID of a `Cart` object. */
  cart_id: Scalars['String'];
  /** An array of items to be updated. */
  cart_items: Array<Maybe<CartItemUpdateInput>>;
};

/** Contains details about the cart after updating items. */
export type UpdateCartItemsOutput = {
  __typename?: 'UpdateCartItemsOutput';
  /** The cart after updating products. */
  cart: Cart;
};

export type UpdateCheckoutSessionOutput = {
  __typename?: 'UpdateCheckoutSessionOutput';
  redirectUrl?: Maybe<Scalars['String']>;
};

/** Contains the customer's wish list and any errors encountered. */
export type UpdateProductsInWishlistOutput = {
  __typename?: 'UpdateProductsInWishlistOutput';
  /** An array of errors encountered while updating products in a wish list. */
  user_errors: Array<Maybe<WishListUserInputError>>;
  /** Contains the wish list with all items that were successfully updated. */
  wishlist: Wishlist;
};

/** Contains URL rewrite details. */
export type UrlRewrite = {
  __typename?: 'UrlRewrite';
  /** An array of request parameters. */
  parameters?: Maybe<Array<Maybe<HttpQueryParameter>>>;
  /** The request URL. */
  url?: Maybe<Scalars['String']>;
};

/** This enumeration defines the entity type. */
export enum UrlRewriteEntityTypeEnum {
  CmsPage = 'CMS_PAGE',
  Product = 'PRODUCT',
  Category = 'CATEGORY',
  AmastyXlandingPage = 'AMASTY_XLANDING_PAGE',
  ChiakiPage = 'CHIAKI_PAGE'
}

/** Defines whether the attribute is filterable in layered navigation. */
export enum UseInLayeredNavigationOptions {
  No = 'NO',
  FilterableWithResults = 'FILTERABLE_WITH_RESULTS',
  FilterableNoResult = 'FILTERABLE_NO_RESULT'
}

/** Contains required input for payment methods with Vault support. */
export type VaultTokenInput = {
  /** The public hash of the payment token. */
  public_hash: Scalars['String'];
};

/** An implementation for virtual product cart items. */
export type VirtualCartItem = CartItemInterface & {
  __typename?: 'VirtualCartItem';
  /** An array containing customizable options the shopper selected. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  date_picker?: Maybe<Scalars['String']>;
  delivery_warning?: Maybe<Scalars['String']>;
  /** An array of errors encountered while loading the cart item */
  errors?: Maybe<Array<Maybe<CartItemError>>>;
  /** @deprecated Use `uid` instead. */
  id: Scalars['String'];
  /** Contains details about the price of the item, including taxes and discounts. */
  prices?: Maybe<CartItemPrices>;
  /** Details about an item in the cart. */
  product: ProductInterface;
  /** The quantity of this item in the cart. */
  quantity: Scalars['Float'];
  /** The unique ID for a `CartItemInterface` object. */
  uid: Scalars['ID'];
};

/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProduct = ProductInterface & RoutableInterface & CustomizableProductInterface & {
  __typename?: 'VirtualProduct';
  /** Add to cart url. */
  add_to_cart_url?: Maybe<Scalars['String']>;
  /** Add to wishlist information. */
  add_to_wishlist?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  additional_features?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  assembly_type?: Maybe<Scalars['Int']>;
  /**
   * The attribute set assigned to the product.
   * @deprecated The field should not be used on the storefront.
   */
  attribute_set_id?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_colours?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  available_sizes?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  back_stock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  backstock?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  barcode?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  base_slat_type?: Maybe<Scalars['Int']>;
  /** Custom data in bedkingdom website */
  bed_data?: Maybe<BedData>;
  /** @deprecated Use the `custom_attributes` field instead. */
  benifts?: Maybe<Scalars['String']>;
  /** The relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled. */
  canonical_url?: Maybe<Scalars['String']>;
  /** The categories assigned to a product. */
  categories?: Maybe<Array<Maybe<CategoryInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  chair_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  color?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  colour?: Maybe<Scalars['String']>;
  /** The product's country of origin. */
  country_of_manufacture?: Maybe<Scalars['String']>;
  /**
   * Timestamp indicating when the product was created.
   * @deprecated The field should not be used on the storefront.
   */
  created_at?: Maybe<Scalars['String']>;
  /** Crosssell Products */
  crosssell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  delivery?: Maybe<Scalars['Int']>;
  /** Detailed information about the product. The value can include simple HTML tags. */
  description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dimentions?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  dining_chairs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_drawers?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  divan_fabric?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  exchange_return_upgrade?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  feet_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  filling_type_search?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  fold_mechanism?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  free_delivery?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  furniture_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ggiftcard_amount_config?: Maybe<Scalars['String']>;
  /** Indicates whether a gift message is available. */
  gift_message_available?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  gtin?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  guarantee?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  headboard_included?: Maybe<Scalars['Int']>;
  /**
   * The ID number assigned to the product.
   * @deprecated Use the `uid` field instead.
   */
  id?: Maybe<Scalars['Int']>;
  /** The relative path to the main image on the product page. */
  image?: Maybe<ProductImage>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ladder?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  leg_diameter?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  length?: Maybe<Scalars['String']>;
  /**
   * A number representing the product's manufacturer.
   * @deprecated Use the `custom_attributes` field instead.
   */
  manufacturer?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  matching_headboard?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  material_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_bundle?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_depth?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_tention?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_turn?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mattress_type?: Maybe<Scalars['Int']>;
  /** An array of media gallery objects. */
  media_gallery?: Maybe<Array<Maybe<MediaGalleryInterface>>>;
  /**
   * An array of MediaGalleryEntry objects.
   * @deprecated Use `media_gallery` instead.
   */
  media_gallery_entries?: Maybe<Array<Maybe<MediaGalleryEntry>>>;
  /** A brief overview of the product for search results listings, maximum 255 characters. */
  meta_description?: Maybe<Scalars['String']>;
  /** A comma-separated list of keywords that are visible only to search engines. */
  meta_keyword?: Maybe<Scalars['String']>;
  /** A string that is displayed in the title bar and tab of the browser and in search results lists. */
  meta_title?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  mpn?: Maybe<Scalars['String']>;
  /** The product name. Customers use this name to identify the product. */
  name?: Maybe<Scalars['String']>;
  /** The beginning date for new product listings, and determines if the product is featured as a new product. */
  new_from_date?: Maybe<Scalars['String']>;
  /** The end date for new product listings. */
  new_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  nocupboards?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  number_of_springs?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  numberdrawers?: Maybe<Scalars['Int']>;
  /** Product stock only x left count */
  only_x_left_in_stock?: Maybe<Scalars['Float']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  optional_extras?: Maybe<Scalars['Int']>;
  /** An array of options for a customizable product. */
  options?: Maybe<Array<Maybe<CustomizableOptionInterface>>>;
  /** If the product has multiple options, determines where they appear on the product page. */
  options_container?: Maybe<Scalars['String']>;
  /**
   * Indicates the price of an item.
   * @deprecated Use `price_range` for product price information.
   */
  price?: Maybe<ProductPrices>;
  /** The range of prices for the product */
  price_range: PriceRange;
  /** An array of `TierPrice` objects. */
  price_tiers?: Maybe<Array<Maybe<TierPrice>>>;
  /** An array of `ProductLinks` objects. */
  product_links?: Maybe<Array<Maybe<ProductLinksInterface>>>;
  /** Product url. */
  product_url?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  ranges?: Maybe<Scalars['Int']>;
  /** The average of all the ratings given to the product. */
  rating_summary: Scalars['Float'];
  /** Contains 0 when there is no redirect error. A value of 301 indicates the URL of the requested resource has been changed permanently, while a value of 302 indicates a temporary redirect. */
  redirect_code: Scalars['Int'];
  /** An array of products to be displayed in a Related Products block. */
  related_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original. */
  relative_url?: Maybe<Scalars['String']>;
  /** The total count of all the reviews given to the product. */
  review_count: Scalars['Int'];
  /** The list of products reviews. */
  reviews: ProductReviews;
  /** @deprecated Use the `custom_attributes` field instead. */
  room_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  seat_type?: Maybe<Scalars['Int']>;
  /** A short description of the product. Its use depends on the theme. */
  short_description?: Maybe<ComplexTextValue>;
  /** @deprecated Use the `custom_attributes` field instead. */
  size?: Maybe<Scalars['Int']>;
  /** A number or code assigned to a product to identify the product, options, price, and manufacturer. */
  sku?: Maybe<Scalars['String']>;
  /** The relative path to the small image, which is used on catalog pages. */
  small_image?: Maybe<ProductImage>;
  /**
   * The beginning date that a product has a special price.
   * @deprecated The field should not be used on the storefront.
   */
  special_from_date?: Maybe<Scalars['String']>;
  /** The discounted price of the product. */
  special_price?: Maybe<Scalars['Float']>;
  /** The end date for a product with a special price. */
  special_to_date?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  split?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  spring_type_search?: Maybe<Scalars['Int']>;
  /** Stock status of the product */
  stock_status?: Maybe<ProductStockStatus>;
  /** @deprecated Use the `custom_attributes` field instead. */
  stompa_colours?: Maybe<Scalars['Int']>;
  /** The file name of a swatch image. */
  swatch_image?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_leg_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_material?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  table_top_colour?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  temperature_control_fabric?: Maybe<Scalars['Int']>;
  /** The relative path to the product's thumbnail image. */
  thumbnail?: Maybe<ProductImage>;
  /**
   * The price when tier pricing is in effect and the items purchased threshold has been reached.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_price?: Maybe<Scalars['Float']>;
  /**
   * An array of ProductTierPrices objects.
   * @deprecated Use `price_tiers` for product tier price information.
   */
  tier_prices?: Maybe<Array<Maybe<ProductTierPrices>>>;
  /** @deprecated Use the `custom_attributes` field instead. */
  top_bunk_size?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_options?: Maybe<Scalars['Int']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  tv_size?: Maybe<Scalars['Int']>;
  /** One of PRODUCT, CATEGORY, or CMS_PAGE. */
  type?: Maybe<UrlRewriteEntityTypeEnum>;
  /**
   * One of simple, virtual, bundle, downloadable, grouped, or configurable.
   * @deprecated Use `__typename` instead.
   */
  type_id?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  udropship_vendor?: Maybe<Scalars['Int']>;
  /** The unique ID for a `ProductInterface` object. */
  uid: Scalars['ID'];
  /**
   * Timestamp indicating when the product was updated.
   * @deprecated The field should not be used on the storefront.
   */
  updated_at?: Maybe<Scalars['String']>;
  /** Upsell Products */
  upsell_products?: Maybe<Array<Maybe<ProductInterface>>>;
  /** The part of the URL that identifies the product */
  url_key?: Maybe<Scalars['String']>;
  /** @deprecated Use product's `canonical_url` or url rewrites instead */
  url_path?: Maybe<Scalars['String']>;
  /** URL rewrites list */
  url_rewrites?: Maybe<Array<Maybe<UrlRewrite>>>;
  /** The part of the product URL that is appended after the url key */
  url_suffix?: Maybe<Scalars['String']>;
  /** @deprecated Use the `custom_attributes` field instead. */
  wardrobe_doors?: Maybe<Scalars['Int']>;
  /**
   * An array of websites in which the product is available.
   * @deprecated The field should not be used on the storefront.
   */
  websites?: Maybe<Array<Maybe<Website>>>;
};


/** Defines a virtual product, which is a non-tangible product that does not require shipping and is not kept in inventory. */
export type VirtualProductReviewsArgs = {
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
};

/** Defines a single product to add to the cart. */
export type VirtualProductCartItemInput = {
  /** An array that defines customizable options for the product. */
  customizable_options?: Maybe<Array<Maybe<CustomizableOptionInput>>>;
  /** An object containing the `sku`, `quantity`, and other relevant information about the product. */
  data: CartItemInput;
};

/** Contains a virtual product wish list item. */
export type VirtualWishlistItem = WishlistItemInterface & {
  __typename?: 'VirtualWishlistItem';
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float'];
};

/** Deprecated. It should not be used on the storefront. Contains information about a website. */
export type Website = {
  __typename?: 'Website';
  /**
   * A code assigned to the website to identify it.
   * @deprecated The field should not be used on the storefront.
   */
  code?: Maybe<Scalars['String']>;
  /**
   * The default group ID of the website.
   * @deprecated The field should not be used on the storefront.
   */
  default_group_id?: Maybe<Scalars['String']>;
  /**
   * The ID number assigned to the website.
   * @deprecated The field should not be used on the storefront.
   */
  id?: Maybe<Scalars['Int']>;
  /**
   * Indicates whether this is the default website.
   * @deprecated The field should not be used on the storefront.
   */
  is_default?: Maybe<Scalars['Boolean']>;
  /**
   * The website name. Websites use this name to identify it easier.
   * @deprecated The field should not be used on the storefront.
   */
  name?: Maybe<Scalars['String']>;
  /**
   * The attribute to use for sorting websites.
   * @deprecated The field should not be used on the storefront.
   */
  sort_order?: Maybe<Scalars['Int']>;
};

/** An error encountered while performing operations with WishList. */
export type WishListUserInputError = {
  __typename?: 'WishListUserInputError';
  /** A wish list-specific error code. */
  code: WishListUserInputErrorType;
  /** A localized error message. */
  message: Scalars['String'];
};

/** A list of possible error types. */
export enum WishListUserInputErrorType {
  ProductNotFound = 'PRODUCT_NOT_FOUND',
  Undefined = 'UNDEFINED'
}

/** Contains a customer wish list. */
export type Wishlist = {
  __typename?: 'Wishlist';
  /** The unique ID for a `Wishlist` object. */
  id?: Maybe<Scalars['ID']>;
  /** @deprecated Use the `items_v2` field instead. */
  items?: Maybe<Array<Maybe<WishlistItem>>>;
  /** The number of items in the wish list. */
  items_count?: Maybe<Scalars['Int']>;
  /** An array of items in the customer's wish list. */
  items_v2?: Maybe<WishlistItems>;
  /** An encrypted code that Magento uses to link to the wish list. */
  sharing_code?: Maybe<Scalars['String']>;
  /** The time of the last modification to the wish list. */
  updated_at?: Maybe<Scalars['String']>;
};


/** Contains a customer wish list. */
export type WishlistItems_V2Args = {
  currentPage?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

/** Contains details about errors encountered when a customer added wish list items to the cart. */
export type WishlistCartUserInputError = {
  __typename?: 'WishlistCartUserInputError';
  /** An error code that describes the error encountered. */
  code: WishlistCartUserInputErrorType;
  /** A localized error message. */
  message: Scalars['String'];
  /** The unique ID of the `Wishlist` object containing an error. */
  wishlistId: Scalars['ID'];
  /** The unique ID of the wish list item containing an error. */
  wishlistItemId: Scalars['ID'];
};

/** A list of possible error types. */
export enum WishlistCartUserInputErrorType {
  ProductNotFound = 'PRODUCT_NOT_FOUND',
  NotSalable = 'NOT_SALABLE',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  Undefined = 'UNDEFINED'
}

/** Contains details about a wish list item. */
export type WishlistItem = {
  __typename?: 'WishlistItem';
  /** The time when the customer added the item to the wish list. */
  added_at?: Maybe<Scalars['String']>;
  /** The customer's comment about this item. */
  description?: Maybe<Scalars['String']>;
  /** The unique ID for a `WishlistItem` object. */
  id?: Maybe<Scalars['Int']>;
  /** Details about the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item */
  qty?: Maybe<Scalars['Float']>;
};

/** Defines the items to add to a wish list. */
export type WishlistItemInput = {
  /** An array of options that the customer entered. */
  entered_options?: Maybe<Array<Maybe<EnteredOptionInput>>>;
  /** For complex product types, the SKU of the parent product. */
  parent_sku?: Maybe<Scalars['String']>;
  /** The amount or number of items to add. */
  quantity: Scalars['Float'];
  /** An array of strings corresponding to options the customer selected. */
  selected_options?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** The SKU of the product to add. For complex product types, specify the child product SKU. */
  sku: Scalars['String'];
};

/** The interface for wish list items. */
export type WishlistItemInterface = {
  /** The date and time the item was added to the wish list. */
  added_at: Scalars['String'];
  /** Custom options selected for the wish list item. */
  customizable_options: Array<Maybe<SelectedCustomizableOption>>;
  /** The description of the item. */
  description?: Maybe<Scalars['String']>;
  /** The unique ID for a `WishlistItemInterface` object. */
  id: Scalars['ID'];
  /** Product details of the wish list item. */
  product?: Maybe<ProductInterface>;
  /** The quantity of this wish list item. */
  quantity: Scalars['Float'];
};

/** Defines updates to items in a wish list. */
export type WishlistItemUpdateInput = {
  /** Customer-entered comments about the item. */
  description?: Maybe<Scalars['String']>;
  /** An array of options that the customer entered. */
  entered_options?: Maybe<Array<Maybe<EnteredOptionInput>>>;
  /** The new amount or number of this item. */
  quantity?: Maybe<Scalars['Float']>;
  /** An array of strings corresponding to options the customer selected. */
  selected_options?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** The unique ID for a `WishlistItemInterface` object. */
  wishlist_item_id: Scalars['ID'];
};

/** Contains an array of items in a wish list. */
export type WishlistItems = {
  __typename?: 'WishlistItems';
  /** A list of items in the wish list. */
  items: Array<Maybe<WishlistItemInterface>>;
  /** Contains pagination metadata. */
  page_info?: Maybe<SearchResultPageInfo>;
};

/** Deprecated: Use the `Wishlist` type instead. */
export type WishlistOutput = {
  __typename?: 'WishlistOutput';
  /**
   * An array of items in the customer's wish list
   * @deprecated Use the `Wishlist.items` field instead.
   */
  items?: Maybe<Array<Maybe<WishlistItem>>>;
  /**
   * The number of items in the wish list.
   * @deprecated Use the `Wishlist.items_count` field instead.
   */
  items_count?: Maybe<Scalars['Int']>;
  /**
   * When multiple wish lists are enabled, the name the customer assigns to the wishlist.
   * @deprecated This field is related to Commerce functionality and is always `null` in Open Source.
   */
  name?: Maybe<Scalars['String']>;
  /**
   * An encrypted code that links to the wish list.
   * @deprecated Use the `Wishlist.sharing_code` field instead.
   */
  sharing_code?: Maybe<Scalars['String']>;
  /**
   * The time of the last modification to the wish list.
   * @deprecated Use the `Wishlist.updated_at` field instead.
   */
  updated_at?: Maybe<Scalars['String']>;
};

export type XnotifInput = {
  email?: Maybe<Scalars['String']>;
  product_id?: Maybe<Scalars['Int']>;
};

export type CreateClearpayCheckoutInput = {
  cart_id: Scalars['String'];
  /** A set of relative URLs that Clearpay uses in response to various actions during the authorization process */
  redirect_path: ClearpayRedirectPathInput;
};

export type CreateClearpayCheckoutOutput = {
  __typename?: 'createClearpayCheckoutOutput';
  /** The UTC timestamp of when the checkout token will expire, in ISO 8601 format. */
  clearpay_expires: Scalars['String'];
  /** A URL that can be used to redirect the consumer to the Clearpay screenflow. */
  clearpay_redirectCheckoutUrl: Scalars['String'];
  /** Clearpay checkout token to be used to complete payment. */
  clearpay_token: Scalars['String'];
};

/** Assigns a specific `cart_id` to the empty cart. */
export type CreateEmptyCartInput = {
  /** The ID to assign to the cart. */
  cart_id?: Maybe<Scalars['String']>;
};

export type CreateKlarnaPaymentsSessionInput = {
  cart_id: Scalars['String'];
};

export type BedCartDataFragment = (
  { __typename?: 'Cart' }
  & Pick<Cart, 'id' | 'total_quantity'>
  & { applied_am_gift_cards?: Maybe<Array<Maybe<(
    { __typename?: 'AppliedAmGiftCard' }
    & Pick<AppliedAmGiftCard, 'code' | 'expiration_date'>
    & { current_balance?: Maybe<(
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    )>, applied_balance?: Maybe<(
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    )> }
  )>>>, items?: Maybe<Array<Maybe<(
    { __typename?: 'AmGiftCardCartItem' }
    & Pick<AmGiftCardCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
    & { prices?: Maybe<(
      { __typename?: 'CartItemPrices' }
      & { row_total_including_tax: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ) }
    )>, product: (
      { __typename: 'AmGiftCardProduct' }
      & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'BundleProduct' }
      & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'ConfigurableProduct' }
      & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'DownloadableProduct' }
      & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'GroupedProduct' }
      & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'SimpleProduct' }
      & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'VirtualProduct' }
      & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) }
  ) | (
    { __typename?: 'BundleCartItem' }
    & Pick<BundleCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
    & { prices?: Maybe<(
      { __typename?: 'CartItemPrices' }
      & { row_total_including_tax: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ) }
    )>, product: (
      { __typename: 'AmGiftCardProduct' }
      & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'BundleProduct' }
      & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'ConfigurableProduct' }
      & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'DownloadableProduct' }
      & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'GroupedProduct' }
      & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'SimpleProduct' }
      & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'VirtualProduct' }
      & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) }
  ) | (
    { __typename?: 'ConfigurableCartItem' }
    & Pick<ConfigurableCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
    & { configurable_options: Array<Maybe<(
      { __typename?: 'SelectedConfigurableOption' }
      & Pick<SelectedConfigurableOption, 'configurable_product_option_uid' | 'option_label' | 'configurable_product_option_value_uid' | 'value_label'>
    )>>, prices?: Maybe<(
      { __typename?: 'CartItemPrices' }
      & { row_total_including_tax: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ) }
    )>, product: (
      { __typename: 'AmGiftCardProduct' }
      & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'BundleProduct' }
      & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'ConfigurableProduct' }
      & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'DownloadableProduct' }
      & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'GroupedProduct' }
      & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'SimpleProduct' }
      & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'VirtualProduct' }
      & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) }
  ) | (
    { __typename?: 'DownloadableCartItem' }
    & Pick<DownloadableCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
    & { prices?: Maybe<(
      { __typename?: 'CartItemPrices' }
      & { row_total_including_tax: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ) }
    )>, product: (
      { __typename: 'AmGiftCardProduct' }
      & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'BundleProduct' }
      & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'ConfigurableProduct' }
      & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'DownloadableProduct' }
      & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'GroupedProduct' }
      & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'SimpleProduct' }
      & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'VirtualProduct' }
      & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) }
  ) | (
    { __typename?: 'SimpleCartItem' }
    & Pick<SimpleCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
    & { customizable_options: Array<Maybe<(
      { __typename?: 'SelectedCustomizableOption' }
      & Pick<SelectedCustomizableOption, 'label' | 'customizable_option_uid' | 'is_required' | 'sort_order' | 'type'>
      & { values: Array<Maybe<(
        { __typename?: 'SelectedCustomizableOptionValue' }
        & Pick<SelectedCustomizableOptionValue, 'customizable_option_value_uid' | 'label' | 'value'>
        & { price: (
          { __typename?: 'CartItemSelectedOptionValuePrice' }
          & Pick<CartItemSelectedOptionValuePrice, 'type' | 'units' | 'value'>
        ) }
      )>> }
    )>>, prices?: Maybe<(
      { __typename?: 'CartItemPrices' }
      & { row_total_including_tax: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ) }
    )>, product: (
      { __typename: 'AmGiftCardProduct' }
      & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'BundleProduct' }
      & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'ConfigurableProduct' }
      & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'DownloadableProduct' }
      & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'GroupedProduct' }
      & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'SimpleProduct' }
      & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'VirtualProduct' }
      & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) }
  ) | (
    { __typename?: 'VirtualCartItem' }
    & Pick<VirtualCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
    & { prices?: Maybe<(
      { __typename?: 'CartItemPrices' }
      & { row_total_including_tax: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ) }
    )>, product: (
      { __typename: 'AmGiftCardProduct' }
      & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'BundleProduct' }
      & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'ConfigurableProduct' }
      & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'DownloadableProduct' }
      & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'GroupedProduct' }
      & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'SimpleProduct' }
      & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) | (
      { __typename: 'VirtualProduct' }
      & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
      & { small_image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url' | 'label'>
      )>, image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )>, price?: Maybe<(
        { __typename?: 'ProductPrices' }
        & { regularPrice?: Maybe<(
          { __typename?: 'Price' }
          & { amount?: Maybe<(
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          )> }
        )> }
      )>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )> }
      ) }
    ) }
  )>>>, prices?: Maybe<(
    { __typename?: 'CartPrices' }
    & { grand_total?: Maybe<(
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    )>, discounts?: Maybe<Array<Maybe<(
      { __typename?: 'Discount' }
      & Pick<Discount, 'label'>
      & { amount: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ) }
    )>>>, subtotal_including_tax?: Maybe<(
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    )>, applied_taxes?: Maybe<Array<Maybe<(
      { __typename?: 'CartTaxItem' }
      & Pick<CartTaxItem, 'label'>
      & { amount: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ) }
    )>>> }
  )>, applied_coupons?: Maybe<Array<Maybe<(
    { __typename?: 'AppliedCoupon' }
    & Pick<AppliedCoupon, 'code'>
  )>>>, selected_payment_method?: Maybe<(
    { __typename?: 'SelectedPaymentMethod' }
    & Pick<SelectedPaymentMethod, 'code' | 'title'>
  )>, available_payment_methods?: Maybe<Array<Maybe<(
    { __typename?: 'AvailablePaymentMethod' }
    & Pick<AvailablePaymentMethod, 'code' | 'title'>
  )>>>, shipping_addresses: Array<Maybe<(
    { __typename?: 'ShippingCartAddress' }
    & Pick<ShippingCartAddress, 'city' | 'street' | 'company' | 'customer_notes' | 'firstname' | 'lastname' | 'telephone'>
    & { available_shipping_methods?: Maybe<Array<Maybe<(
      { __typename?: 'AvailableShippingMethod' }
      & Pick<AvailableShippingMethod, 'available' | 'carrier_code' | 'carrier_title' | 'method_code' | 'method_title'>
      & { amount: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), price_incl_tax: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ) }
    )>>>, country: (
      { __typename?: 'CartAddressCountry' }
      & Pick<CartAddressCountry, 'code' | 'label'>
    ), selected_shipping_method?: Maybe<(
      { __typename?: 'SelectedShippingMethod' }
      & Pick<SelectedShippingMethod, 'method_title' | 'method_code' | 'carrier_code' | 'carrier_title'>
      & { amount: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ) }
    )> }
  )>> }
);

export type BedDataFragment = (
  { __typename?: 'BedData' }
  & Pick<BedData, 'finance_price' | 'gtm_tag_click'>
  & { bed_category_product_image?: Maybe<Array<Maybe<(
    { __typename?: 'BedProductImage' }
    & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
  )>>>, trustpilot_product_reviews_summary?: Maybe<(
    { __typename?: 'TrustpilotProductReviewsSummary' }
    & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
    & { attributes?: Maybe<(
      { __typename?: 'TrustpilotAttributes' }
      & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
    )> }
  )> }
);

export type BedKingdomCustomerAddFragment = (
  { __typename?: 'CustomerAddress' }
  & Pick<CustomerAddress, 'id' | 'firstname' | 'middlename' | 'lastname' | 'street' | 'city' | 'postcode' | 'telephone' | 'country_code'>
);

export type BedKingdomCustomerDetailFragment = (
  { __typename?: 'Customer' }
  & Pick<Customer, 'id' | 'email' | 'firstname' | 'lastname' | 'gender' | 'is_subscribed' | 'date_of_birth' | 'default_billing' | 'default_shipping' | 'group_id'>
  & { addresses?: Maybe<Array<Maybe<(
    { __typename?: 'CustomerAddress' }
    & Pick<CustomerAddress, 'id' | 'firstname' | 'middlename' | 'lastname' | 'street' | 'city' | 'postcode' | 'telephone' | 'country_code' | 'default_billing' | 'default_shipping' | 'fax'>
    & { region?: Maybe<(
      { __typename?: 'CustomerAddressRegion' }
      & Pick<CustomerAddressRegion, 'region' | 'region_code'>
    )> }
  )>>> }
);

export type BedKingdomCustomerOrderFragment = (
  { __typename?: 'CustomerOrder' }
  & Pick<CustomerOrder, 'id' | 'number' | 'order_date' | 'shipping_method' | 'status' | 'carrier'>
  & { billing_address?: Maybe<(
    { __typename?: 'OrderAddress' }
    & Pick<OrderAddress, 'firstname' | 'middlename' | 'lastname' | 'street' | 'city' | 'postcode' | 'telephone' | 'country_code'>
  )>, shipping_address?: Maybe<(
    { __typename?: 'OrderAddress' }
    & Pick<OrderAddress, 'firstname' | 'middlename' | 'lastname' | 'street' | 'city' | 'postcode' | 'telephone' | 'country_code'>
  )>, payment_methods?: Maybe<Array<Maybe<(
    { __typename?: 'OrderPaymentMethod' }
    & Pick<OrderPaymentMethod, 'name' | 'type'>
    & { additional_data?: Maybe<Array<Maybe<(
      { __typename?: 'KeyValue' }
      & Pick<KeyValue, 'name' | 'value'>
    )>>> }
  )>>>, total?: Maybe<(
    { __typename?: 'OrderTotal' }
    & { grand_total: (
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    ), total_shipping: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), total_tax: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), subtotal: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), discounts?: Maybe<Array<Maybe<(
      { __typename?: 'Discount' }
      & Pick<Discount, 'label'>
      & { amount: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ) }
    )>>> }
  )>, items?: Maybe<Array<Maybe<(
    { __typename?: 'BundleOrderItem' }
    & Pick<BundleOrderItem, 'id' | 'product_name' | 'product_sku' | 'quantity_ordered' | 'quantity_shipped'>
    & { product_sale_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), selected_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>>, additional_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>> }
  ) | (
    { __typename?: 'DownloadableOrderItem' }
    & Pick<DownloadableOrderItem, 'id' | 'product_name' | 'product_sku' | 'quantity_ordered' | 'quantity_shipped'>
    & { product_sale_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), selected_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>>, additional_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>> }
  ) | (
    { __typename?: 'OrderItem' }
    & Pick<OrderItem, 'id' | 'product_name' | 'product_sku' | 'quantity_ordered' | 'quantity_shipped'>
    & { product_sale_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), selected_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>>, additional_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>> }
  )>>> }
);

export type BedKingdomCustomerOrderDetailsFragment = (
  { __typename?: 'CustomerOrder' }
  & Pick<CustomerOrder, 'id' | 'number' | 'order_date' | 'shipping_method' | 'status' | 'carrier'>
  & { billing_address?: Maybe<(
    { __typename?: 'OrderAddress' }
    & Pick<OrderAddress, 'firstname' | 'middlename' | 'lastname' | 'street' | 'city' | 'postcode' | 'telephone' | 'country_code'>
  )>, shipping_address?: Maybe<(
    { __typename?: 'OrderAddress' }
    & Pick<OrderAddress, 'firstname' | 'middlename' | 'lastname' | 'street' | 'city' | 'postcode' | 'telephone' | 'country_code'>
  )>, payment_methods?: Maybe<Array<Maybe<(
    { __typename?: 'OrderPaymentMethod' }
    & Pick<OrderPaymentMethod, 'name' | 'type'>
    & { additional_data?: Maybe<Array<Maybe<(
      { __typename?: 'KeyValue' }
      & Pick<KeyValue, 'name' | 'value'>
    )>>> }
  )>>>, total?: Maybe<(
    { __typename?: 'OrderTotal' }
    & { grand_total: (
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    ), total_shipping: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), total_tax: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), subtotal: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), discounts?: Maybe<Array<Maybe<(
      { __typename?: 'Discount' }
      & Pick<Discount, 'label'>
      & { amount: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ) }
    )>>> }
  )>, items?: Maybe<Array<Maybe<(
    { __typename?: 'BundleOrderItem' }
    & Pick<BundleOrderItem, 'id' | 'product_name' | 'product_sku' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
    & { product_sale_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), selected_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>>, additional_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>>, entered_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>> }
  ) | (
    { __typename?: 'DownloadableOrderItem' }
    & Pick<DownloadableOrderItem, 'id' | 'product_name' | 'product_sku' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
    & { product_sale_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), selected_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>>, additional_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>>, entered_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>> }
  ) | (
    { __typename?: 'OrderItem' }
    & Pick<OrderItem, 'id' | 'product_name' | 'product_sku' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
    & { product_sale_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'currency' | 'value'>
    ), selected_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>>, additional_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>>, entered_options?: Maybe<Array<Maybe<(
      { __typename?: 'OrderItemOption' }
      & Pick<OrderItemOption, 'label' | 'value'>
    )>>> }
  )>>>, invoices: Array<Maybe<(
    { __typename?: 'Invoice' }
    & Pick<Invoice, 'id' | 'number'>
    & { total?: Maybe<(
      { __typename?: 'InvoiceTotal' }
      & { grand_total: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), total_shipping: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), total_tax: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), subtotal: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), discounts?: Maybe<Array<Maybe<(
        { __typename?: 'Discount' }
        & Pick<Discount, 'label'>
        & { amount: (
          { __typename?: 'Money' }
          & Pick<Money, 'currency' | 'value'>
        ) }
      )>>> }
    )>, items?: Maybe<Array<Maybe<(
      { __typename?: 'BundleInvoiceItem' }
      & Pick<BundleInvoiceItem, 'id' | 'product_name' | 'product_sku' | 'quantity_invoiced'>
      & { product_sale_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discounts?: Maybe<Array<Maybe<(
        { __typename?: 'Discount' }
        & Pick<Discount, 'label'>
        & { amount: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ) }
      )>>>, order_item?: Maybe<(
        { __typename?: 'BundleOrderItem' }
        & Pick<BundleOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'DownloadableOrderItem' }
        & Pick<DownloadableOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'OrderItem' }
        & Pick<OrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      )> }
    ) | (
      { __typename?: 'DownloadableInvoiceItem' }
      & Pick<DownloadableInvoiceItem, 'id' | 'product_name' | 'product_sku' | 'quantity_invoiced'>
      & { product_sale_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discounts?: Maybe<Array<Maybe<(
        { __typename?: 'Discount' }
        & Pick<Discount, 'label'>
        & { amount: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ) }
      )>>>, order_item?: Maybe<(
        { __typename?: 'BundleOrderItem' }
        & Pick<BundleOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'DownloadableOrderItem' }
        & Pick<DownloadableOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'OrderItem' }
        & Pick<OrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      )> }
    ) | (
      { __typename?: 'InvoiceItem' }
      & Pick<InvoiceItem, 'id' | 'product_name' | 'product_sku' | 'quantity_invoiced'>
      & { product_sale_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discounts?: Maybe<Array<Maybe<(
        { __typename?: 'Discount' }
        & Pick<Discount, 'label'>
        & { amount: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ) }
      )>>>, order_item?: Maybe<(
        { __typename?: 'BundleOrderItem' }
        & Pick<BundleOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'DownloadableOrderItem' }
        & Pick<DownloadableOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'OrderItem' }
        & Pick<OrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      )> }
    )>>> }
  )>>, shipments?: Maybe<Array<Maybe<(
    { __typename?: 'OrderShipment' }
    & Pick<OrderShipment, 'id' | 'number'>
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'BundleShipmentItem' }
      & Pick<BundleShipmentItem, 'id' | 'product_name' | 'product_sku' | 'quantity_shipped'>
      & { product_sale_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), order_item?: Maybe<(
        { __typename?: 'BundleOrderItem' }
        & Pick<BundleOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'DownloadableOrderItem' }
        & Pick<DownloadableOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'OrderItem' }
        & Pick<OrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      )> }
    ) | (
      { __typename?: 'ShipmentItem' }
      & Pick<ShipmentItem, 'id' | 'product_name' | 'product_sku' | 'quantity_shipped'>
      & { product_sale_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'currency' | 'value'>
      ), order_item?: Maybe<(
        { __typename?: 'BundleOrderItem' }
        & Pick<BundleOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'DownloadableOrderItem' }
        & Pick<DownloadableOrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      ) | (
        { __typename?: 'OrderItem' }
        & Pick<OrderItem, 'id' | 'product_name' | 'product_sku' | 'product_url_key' | 'product_type' | 'status' | 'quantity_ordered' | 'quantity_shipped' | 'quantity_refunded' | 'quantity_invoiced' | 'quantity_canceled' | 'quantity_returned'>
        & { product_sale_price: (
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        ), discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>>>, selected_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, entered_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>>, additional_options?: Maybe<Array<Maybe<(
          { __typename?: 'OrderItemOption' }
          & Pick<OrderItemOption, 'label' | 'value'>
        )>>> }
      )> }
    )>>>, tracking?: Maybe<Array<Maybe<(
      { __typename?: 'ShipmentTracking' }
      & Pick<ShipmentTracking, 'title' | 'number' | 'carrier'>
    )>>> }
  )>>> }
);

type BedKingdomProductDetails_AmGiftCardProduct_Fragment = (
  { __typename: 'AmGiftCardProduct' }
  & Pick<AmGiftCardProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key' | 'meta_title' | 'meta_keyword' | 'meta_description' | 'manufacturer'>
  & { options?: Maybe<Array<Maybe<(
    { __typename?: 'CustomizableAreaOption' }
    & Pick<CustomizableAreaOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableCheckboxOption' }
    & Pick<CustomizableCheckboxOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableCheckboxValue' }
      & Pick<CustomizableCheckboxValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableDateOption' }
    & Pick<CustomizableDateOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableDropDownOption' }
    & Pick<CustomizableDropDownOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableDropDownValue' }
      & Pick<CustomizableDropDownValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'uid' | 'title' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableFieldOption' }
    & Pick<CustomizableFieldOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableFileOption' }
    & Pick<CustomizableFileOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableMultipleOption' }
    & Pick<CustomizableMultipleOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableMultipleValue' }
      & Pick<CustomizableMultipleValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableRadioOption' }
    & Pick<CustomizableRadioOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableRadioValue' }
      & Pick<CustomizableRadioValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  )>>>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & Pick<BedData, 'finance_price' | 'rich_snippets'>
    & { bed_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'url_thumbnail' | 'label' | 'position' | 'isMain' | 'type' | 'videoUrl'>
    )>>>, bed_product_image_360?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductDetails_BundleProduct_Fragment = (
  { __typename: 'BundleProduct' }
  & Pick<BundleProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key' | 'meta_title' | 'meta_keyword' | 'meta_description' | 'manufacturer'>
  & { options?: Maybe<Array<Maybe<(
    { __typename?: 'CustomizableAreaOption' }
    & Pick<CustomizableAreaOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableCheckboxOption' }
    & Pick<CustomizableCheckboxOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableCheckboxValue' }
      & Pick<CustomizableCheckboxValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableDateOption' }
    & Pick<CustomizableDateOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableDropDownOption' }
    & Pick<CustomizableDropDownOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableDropDownValue' }
      & Pick<CustomizableDropDownValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'uid' | 'title' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableFieldOption' }
    & Pick<CustomizableFieldOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableFileOption' }
    & Pick<CustomizableFileOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableMultipleOption' }
    & Pick<CustomizableMultipleOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableMultipleValue' }
      & Pick<CustomizableMultipleValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableRadioOption' }
    & Pick<CustomizableRadioOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableRadioValue' }
      & Pick<CustomizableRadioValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  )>>>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & Pick<BedData, 'finance_price' | 'rich_snippets'>
    & { bed_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'url_thumbnail' | 'label' | 'position' | 'isMain' | 'type' | 'videoUrl'>
    )>>>, bed_product_image_360?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductDetails_ConfigurableProduct_Fragment = (
  { __typename: 'ConfigurableProduct' }
  & Pick<ConfigurableProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key' | 'meta_title' | 'meta_keyword' | 'meta_description' | 'manufacturer'>
  & { options?: Maybe<Array<Maybe<(
    { __typename?: 'CustomizableAreaOption' }
    & Pick<CustomizableAreaOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableCheckboxOption' }
    & Pick<CustomizableCheckboxOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableCheckboxValue' }
      & Pick<CustomizableCheckboxValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableDateOption' }
    & Pick<CustomizableDateOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableDropDownOption' }
    & Pick<CustomizableDropDownOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableDropDownValue' }
      & Pick<CustomizableDropDownValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'uid' | 'title' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableFieldOption' }
    & Pick<CustomizableFieldOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableFileOption' }
    & Pick<CustomizableFileOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableMultipleOption' }
    & Pick<CustomizableMultipleOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableMultipleValue' }
      & Pick<CustomizableMultipleValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableRadioOption' }
    & Pick<CustomizableRadioOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableRadioValue' }
      & Pick<CustomizableRadioValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  )>>>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & Pick<BedData, 'finance_price' | 'rich_snippets'>
    & { bed_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'url_thumbnail' | 'label' | 'position' | 'isMain' | 'type' | 'videoUrl'>
    )>>>, bed_product_image_360?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
  & ConfigurableProductFragment
);

type BedKingdomProductDetails_DownloadableProduct_Fragment = (
  { __typename: 'DownloadableProduct' }
  & Pick<DownloadableProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key' | 'meta_title' | 'meta_keyword' | 'meta_description' | 'manufacturer'>
  & { options?: Maybe<Array<Maybe<(
    { __typename?: 'CustomizableAreaOption' }
    & Pick<CustomizableAreaOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableCheckboxOption' }
    & Pick<CustomizableCheckboxOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableCheckboxValue' }
      & Pick<CustomizableCheckboxValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableDateOption' }
    & Pick<CustomizableDateOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableDropDownOption' }
    & Pick<CustomizableDropDownOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableDropDownValue' }
      & Pick<CustomizableDropDownValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'uid' | 'title' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableFieldOption' }
    & Pick<CustomizableFieldOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableFileOption' }
    & Pick<CustomizableFileOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableMultipleOption' }
    & Pick<CustomizableMultipleOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableMultipleValue' }
      & Pick<CustomizableMultipleValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableRadioOption' }
    & Pick<CustomizableRadioOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableRadioValue' }
      & Pick<CustomizableRadioValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  )>>>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & Pick<BedData, 'finance_price' | 'rich_snippets'>
    & { bed_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'url_thumbnail' | 'label' | 'position' | 'isMain' | 'type' | 'videoUrl'>
    )>>>, bed_product_image_360?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductDetails_GroupedProduct_Fragment = (
  { __typename: 'GroupedProduct' }
  & Pick<GroupedProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key' | 'meta_title' | 'meta_keyword' | 'meta_description' | 'manufacturer'>
  & { media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & Pick<BedData, 'finance_price' | 'rich_snippets'>
    & { bed_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'url_thumbnail' | 'label' | 'position' | 'isMain' | 'type' | 'videoUrl'>
    )>>>, bed_product_image_360?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductDetails_SimpleProduct_Fragment = (
  { __typename: 'SimpleProduct' }
  & Pick<SimpleProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key' | 'meta_title' | 'meta_keyword' | 'meta_description' | 'manufacturer'>
  & { options?: Maybe<Array<Maybe<(
    { __typename?: 'CustomizableAreaOption' }
    & Pick<CustomizableAreaOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableCheckboxOption' }
    & Pick<CustomizableCheckboxOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableCheckboxValue' }
      & Pick<CustomizableCheckboxValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableDateOption' }
    & Pick<CustomizableDateOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableDropDownOption' }
    & Pick<CustomizableDropDownOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableDropDownValue' }
      & Pick<CustomizableDropDownValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'uid' | 'title' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableFieldOption' }
    & Pick<CustomizableFieldOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableFileOption' }
    & Pick<CustomizableFileOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableMultipleOption' }
    & Pick<CustomizableMultipleOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableMultipleValue' }
      & Pick<CustomizableMultipleValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableRadioOption' }
    & Pick<CustomizableRadioOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableRadioValue' }
      & Pick<CustomizableRadioValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  )>>>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & Pick<BedData, 'finance_price' | 'rich_snippets'>
    & { bed_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'url_thumbnail' | 'label' | 'position' | 'isMain' | 'type' | 'videoUrl'>
    )>>>, bed_product_image_360?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductDetails_VirtualProduct_Fragment = (
  { __typename: 'VirtualProduct' }
  & Pick<VirtualProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key' | 'meta_title' | 'meta_keyword' | 'meta_description' | 'manufacturer'>
  & { options?: Maybe<Array<Maybe<(
    { __typename?: 'CustomizableAreaOption' }
    & Pick<CustomizableAreaOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableCheckboxOption' }
    & Pick<CustomizableCheckboxOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableCheckboxValue' }
      & Pick<CustomizableCheckboxValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableDateOption' }
    & Pick<CustomizableDateOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableDropDownOption' }
    & Pick<CustomizableDropDownOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableDropDownValue' }
      & Pick<CustomizableDropDownValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'uid' | 'title' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableFieldOption' }
    & Pick<CustomizableFieldOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableFileOption' }
    & Pick<CustomizableFileOption, 'uid' | 'required' | 'sort_order' | 'title'>
  ) | (
    { __typename?: 'CustomizableMultipleOption' }
    & Pick<CustomizableMultipleOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableMultipleValue' }
      & Pick<CustomizableMultipleValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  ) | (
    { __typename?: 'CustomizableRadioOption' }
    & Pick<CustomizableRadioOption, 'required' | 'sort_order' | 'title' | 'uid'>
    & { value?: Maybe<Array<Maybe<(
      { __typename?: 'CustomizableRadioValue' }
      & Pick<CustomizableRadioValue, 'url' | 'option_type_id' | 'price' | 'price_type' | 'sku' | 'title' | 'uid' | 'base_image'>
    )>>> }
  )>>>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & Pick<BedData, 'finance_price' | 'rich_snippets'>
    & { bed_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'url_thumbnail' | 'label' | 'position' | 'isMain' | 'type' | 'videoUrl'>
    )>>>, bed_product_image_360?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

export type BedKingdomProductDetailsFragment = BedKingdomProductDetails_AmGiftCardProduct_Fragment | BedKingdomProductDetails_BundleProduct_Fragment | BedKingdomProductDetails_ConfigurableProduct_Fragment | BedKingdomProductDetails_DownloadableProduct_Fragment | BedKingdomProductDetails_GroupedProduct_Fragment | BedKingdomProductDetails_SimpleProduct_Fragment | BedKingdomProductDetails_VirtualProduct_Fragment;

type BedKingdomProductItem_AmGiftCardProduct_Fragment = (
  { __typename: 'AmGiftCardProduct' }
  & Pick<AmGiftCardProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & BedDataFragment
  )> }
);

type BedKingdomProductItem_BundleProduct_Fragment = (
  { __typename: 'BundleProduct' }
  & Pick<BundleProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & BedDataFragment
  )> }
);

type BedKingdomProductItem_ConfigurableProduct_Fragment = (
  { __typename: 'ConfigurableProduct' }
  & Pick<ConfigurableProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & BedDataFragment
  )> }
  & ConfigurableProductListItemFragment
);

type BedKingdomProductItem_DownloadableProduct_Fragment = (
  { __typename: 'DownloadableProduct' }
  & Pick<DownloadableProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & BedDataFragment
  )> }
);

type BedKingdomProductItem_GroupedProduct_Fragment = (
  { __typename: 'GroupedProduct' }
  & Pick<GroupedProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & BedDataFragment
  )> }
);

type BedKingdomProductItem_SimpleProduct_Fragment = (
  { __typename: 'SimpleProduct' }
  & Pick<SimpleProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & BedDataFragment
  )> }
);

type BedKingdomProductItem_VirtualProduct_Fragment = (
  { __typename: 'VirtualProduct' }
  & Pick<VirtualProduct, 'id' | 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & PriceRangeFragment
  ), bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & BedDataFragment
  )> }
);

export type BedKingdomProductItemFragment = BedKingdomProductItem_AmGiftCardProduct_Fragment | BedKingdomProductItem_BundleProduct_Fragment | BedKingdomProductItem_ConfigurableProduct_Fragment | BedKingdomProductItem_DownloadableProduct_Fragment | BedKingdomProductItem_GroupedProduct_Fragment | BedKingdomProductItem_SimpleProduct_Fragment | BedKingdomProductItem_VirtualProduct_Fragment;

type BedKingdomProductItemMostViewed_AmGiftCardProduct_Fragment = (
  { __typename: 'AmGiftCardProduct' }
  & Pick<AmGiftCardProduct, 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { short_description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & { minimum_price: (
      { __typename?: 'ProductPrice' }
      & { regular_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), final_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discount?: Maybe<(
        { __typename?: 'ProductDiscount' }
        & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
      )> }
    ) }
  ), image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & { bed_category_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductItemMostViewed_BundleProduct_Fragment = (
  { __typename: 'BundleProduct' }
  & Pick<BundleProduct, 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { short_description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & { minimum_price: (
      { __typename?: 'ProductPrice' }
      & { regular_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), final_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discount?: Maybe<(
        { __typename?: 'ProductDiscount' }
        & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
      )> }
    ) }
  ), image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & { bed_category_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductItemMostViewed_ConfigurableProduct_Fragment = (
  { __typename: 'ConfigurableProduct' }
  & Pick<ConfigurableProduct, 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { variants?: Maybe<Array<Maybe<(
    { __typename?: 'ConfigurableVariant' }
    & { attributes?: Maybe<Array<Maybe<(
      { __typename?: 'ConfigurableAttributeOption' }
      & Pick<ConfigurableAttributeOption, 'label'>
    )>>>, product?: Maybe<(
      { __typename?: 'SimpleProduct' }
      & Pick<SimpleProduct, 'uid' | 'stock_status'>
      & { image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, media_gallery?: Maybe<Array<Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      ) | (
        { __typename?: 'ProductVideo' }
        & Pick<ProductVideo, 'url'>
      )>>>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_category_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
        )>>> }
      )> }
    )> }
  )>>>, short_description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & { minimum_price: (
      { __typename?: 'ProductPrice' }
      & { regular_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), final_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discount?: Maybe<(
        { __typename?: 'ProductDiscount' }
        & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
      )> }
    ) }
  ), image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & { bed_category_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductItemMostViewed_DownloadableProduct_Fragment = (
  { __typename: 'DownloadableProduct' }
  & Pick<DownloadableProduct, 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { short_description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & { minimum_price: (
      { __typename?: 'ProductPrice' }
      & { regular_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), final_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discount?: Maybe<(
        { __typename?: 'ProductDiscount' }
        & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
      )> }
    ) }
  ), image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & { bed_category_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductItemMostViewed_GroupedProduct_Fragment = (
  { __typename: 'GroupedProduct' }
  & Pick<GroupedProduct, 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { short_description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & { minimum_price: (
      { __typename?: 'ProductPrice' }
      & { regular_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), final_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discount?: Maybe<(
        { __typename?: 'ProductDiscount' }
        & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
      )> }
    ) }
  ), image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & { bed_category_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductItemMostViewed_SimpleProduct_Fragment = (
  { __typename: 'SimpleProduct' }
  & Pick<SimpleProduct, 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { short_description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & { minimum_price: (
      { __typename?: 'ProductPrice' }
      & { regular_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), final_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discount?: Maybe<(
        { __typename?: 'ProductDiscount' }
        & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
      )> }
    ) }
  ), image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & { bed_category_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

type BedKingdomProductItemMostViewed_VirtualProduct_Fragment = (
  { __typename: 'VirtualProduct' }
  & Pick<VirtualProduct, 'uid' | 'name' | 'sku' | 'delivery' | 'new_from_date' | 'new_to_date' | 'stock_status' | 'url_key'>
  & { short_description?: Maybe<(
    { __typename?: 'ComplexTextValue' }
    & Pick<ComplexTextValue, 'html'>
  )>, price_range: (
    { __typename?: 'PriceRange' }
    & { minimum_price: (
      { __typename?: 'ProductPrice' }
      & { regular_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), final_price: (
        { __typename?: 'Money' }
        & Pick<Money, 'value' | 'currency'>
      ), discount?: Maybe<(
        { __typename?: 'ProductDiscount' }
        & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
      )> }
    ) }
  ), image?: Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  )>, media_gallery?: Maybe<Array<Maybe<(
    { __typename?: 'ProductImage' }
    & Pick<ProductImage, 'url'>
  ) | (
    { __typename?: 'ProductVideo' }
    & Pick<ProductVideo, 'url'>
  )>>>, bed_data?: Maybe<(
    { __typename?: 'BedData' }
    & { bed_category_product_image?: Maybe<Array<Maybe<(
      { __typename?: 'BedProductImage' }
      & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
    )>>>, trustpilot_product_reviews_summary?: Maybe<(
      { __typename?: 'TrustpilotProductReviewsSummary' }
      & Pick<TrustpilotProductReviewsSummary, 'product_id' | 'stars_average' | 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
      & { attributes?: Maybe<(
        { __typename?: 'TrustpilotAttributes' }
        & Pick<TrustpilotAttributes, 'quality' | 'value_for_money'>
      )> }
    )> }
  )> }
);

export type BedKingdomProductItemMostViewedFragment = BedKingdomProductItemMostViewed_AmGiftCardProduct_Fragment | BedKingdomProductItemMostViewed_BundleProduct_Fragment | BedKingdomProductItemMostViewed_ConfigurableProduct_Fragment | BedKingdomProductItemMostViewed_DownloadableProduct_Fragment | BedKingdomProductItemMostViewed_GroupedProduct_Fragment | BedKingdomProductItemMostViewed_SimpleProduct_Fragment | BedKingdomProductItemMostViewed_VirtualProduct_Fragment;

export type ConfigurableProductFragment = (
  { __typename?: 'ConfigurableProduct' }
  & { configurable_options?: Maybe<Array<Maybe<(
    { __typename?: 'ConfigurableProductOptions' }
    & Pick<ConfigurableProductOptions, 'attribute_code' | 'uid' | 'attribute_uid' | 'label'>
    & { values?: Maybe<Array<Maybe<(
      { __typename?: 'ConfigurableProductOptionsValues' }
      & Pick<ConfigurableProductOptionsValues, 'uid' | 'default_label' | 'label' | 'store_label' | 'use_default_value'>
    )>>> }
  )>>>, variants?: Maybe<Array<Maybe<(
    { __typename?: 'ConfigurableVariant' }
    & { attributes?: Maybe<Array<Maybe<(
      { __typename?: 'ConfigurableAttributeOption' }
      & Pick<ConfigurableAttributeOption, 'code' | 'uid' | 'value_index' | 'label'>
    )>>>, product?: Maybe<(
      { __typename?: 'SimpleProduct' }
      & Pick<SimpleProduct, 'id' | 'delivery' | 'special_price' | 'sku' | 'stock_status'>
      & { options?: Maybe<Array<Maybe<(
        { __typename?: 'CustomizableAreaOption' }
        & Pick<CustomizableAreaOption, 'uid' | 'required' | 'sort_order' | 'title'>
      ) | (
        { __typename?: 'CustomizableCheckboxOption' }
        & Pick<CustomizableCheckboxOption, 'required' | 'sort_order' | 'title' | 'uid'>
        & { value?: Maybe<Array<Maybe<(
          { __typename?: 'CustomizableCheckboxValue' }
          & Pick<CustomizableCheckboxValue, 'option_type_id' | 'price' | 'price_type' | 'sku' | 'sort_order' | 'title' | 'uid' | 'base_image'>
        )>>> }
      ) | (
        { __typename?: 'CustomizableDateOption' }
        & Pick<CustomizableDateOption, 'uid' | 'required' | 'sort_order' | 'title'>
      ) | (
        { __typename?: 'CustomizableDropDownOption' }
        & Pick<CustomizableDropDownOption, 'required' | 'sort_order' | 'title' | 'uid'>
        & { value?: Maybe<Array<Maybe<(
          { __typename?: 'CustomizableDropDownValue' }
          & Pick<CustomizableDropDownValue, 'option_type_id' | 'price' | 'price_type' | 'sku' | 'uid' | 'title' | 'sort_order' | 'base_image'>
        )>>> }
      ) | (
        { __typename?: 'CustomizableFieldOption' }
        & Pick<CustomizableFieldOption, 'uid' | 'required' | 'sort_order' | 'title'>
      ) | (
        { __typename?: 'CustomizableFileOption' }
        & Pick<CustomizableFileOption, 'uid' | 'required' | 'sort_order' | 'title'>
      ) | (
        { __typename?: 'CustomizableMultipleOption' }
        & Pick<CustomizableMultipleOption, 'uid' | 'required' | 'sort_order' | 'title'>
      ) | (
        { __typename?: 'CustomizableRadioOption' }
        & Pick<CustomizableRadioOption, 'uid' | 'required' | 'sort_order' | 'title'>
      )>>>, price_tiers?: Maybe<Array<Maybe<(
        { __typename?: 'TierPrice' }
        & Pick<TierPrice, 'quantity'>
        & { discount?: Maybe<(
          { __typename?: 'ProductDiscount' }
          & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
        )>, final_price?: Maybe<(
          { __typename?: 'Money' }
          & Pick<Money, 'currency' | 'value'>
        )> }
      )>>>, price_range: (
        { __typename?: 'PriceRange' }
        & { maximum_price?: Maybe<(
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        )>, minimum_price: (
          { __typename?: 'ProductPrice' }
          & { regular_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), discount?: Maybe<(
            { __typename?: 'ProductDiscount' }
            & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
          )>, final_price: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), fixed_product_taxes?: Maybe<Array<Maybe<(
            { __typename?: 'FixedProductTax' }
            & Pick<FixedProductTax, 'label'>
            & { amount?: Maybe<(
              { __typename?: 'Money' }
              & Pick<Money, 'currency' | 'value'>
            )> }
          )>>> }
        ) }
      ), media_gallery?: Maybe<Array<Maybe<(
        { __typename: 'ProductImage' }
        & Pick<ProductImage, 'disabled' | 'label' | 'position' | 'url'>
      ) | (
        { __typename: 'ProductVideo' }
        & Pick<ProductVideo, 'disabled' | 'label' | 'position' | 'url'>
      )>>>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & { bed_product_image?: Maybe<Array<Maybe<(
          { __typename?: 'BedProductImage' }
          & Pick<BedProductImage, 'url' | 'url_mobile' | 'url_thumbnail' | 'label' | 'position' | 'isMain' | 'type' | 'videoUrl'>
        )>>> }
      )> }
    )> }
  )>>> }
);

export type ConfigurableProductListItemFragment = (
  { __typename?: 'ConfigurableProduct' }
  & { configurable_options?: Maybe<Array<Maybe<(
    { __typename?: 'ConfigurableProductOptions' }
    & Pick<ConfigurableProductOptions, 'attribute_code' | 'uid' | 'attribute_uid' | 'label'>
    & { values?: Maybe<Array<Maybe<(
      { __typename?: 'ConfigurableProductOptionsValues' }
      & Pick<ConfigurableProductOptionsValues, 'uid' | 'default_label' | 'label' | 'store_label' | 'use_default_value'>
    )>>> }
  )>>>, variants?: Maybe<Array<Maybe<(
    { __typename?: 'ConfigurableVariant' }
    & { attributes?: Maybe<Array<Maybe<(
      { __typename?: 'ConfigurableAttributeOption' }
      & Pick<ConfigurableAttributeOption, 'code' | 'uid' | 'value_index' | 'label'>
    )>>>, product?: Maybe<(
      { __typename?: 'SimpleProduct' }
      & Pick<SimpleProduct, 'uid' | 'sku' | 'stock_status'>
      & { image?: Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      )>, media_gallery?: Maybe<Array<Maybe<(
        { __typename?: 'ProductImage' }
        & Pick<ProductImage, 'url'>
      ) | (
        { __typename?: 'ProductVideo' }
        & Pick<ProductVideo, 'url'>
      )>>>, bed_data?: Maybe<(
        { __typename?: 'BedData' }
        & BedDataFragment
      )> }
    )> }
  )>>> }
);

export type MegaMenuItemFragment = (
  { __typename?: 'MegamenuItemsOutput' }
  & Pick<MegamenuItemsOutput, 'id' | 'item_id' | 'name' | 'path' | 'url_key' | 'url_path' | 'show_name' | 'classes' | 'child_col' | 'sub_width' | 'align' | 'icon_position' | 'icon_classes' | 'is_group' | 'status' | 'disable_bellow' | 'show_icon' | 'icon' | 'show_header' | 'header_html' | 'show_left_sidebar' | 'left_sidebar_width' | 'menu_id' | 'left_sidebar_html' | 'show_content' | 'content_width' | 'content_type' | 'link_type' | 'link' | 'category' | 'target' | 'content_html' | 'show_right_sidebar' | 'right_sidebar_width' | 'right_sidebar_html' | 'show_footer' | 'footer_html' | 'color' | 'hover_color' | 'bg_color' | 'bg_hover_color' | 'inline_css' | 'tab_position' | 'before_html' | 'after_html' | 'caret' | 'hover_caret' | 'sub_height' | 'hover_icon' | 'dropdown_bgcolor' | 'dropdown_bgimage' | 'dropdown_bgimagerepeat' | 'dropdown_bgpositionx' | 'dropdown_bgpositiony' | 'dropdown_inlinecss' | 'parentcat' | 'animation_in' | 'animation_time' | 'child_col_type' | 'submenu_sorttype' | 'isgroup_level' | 'htmlId'>
);

export type PriceRangeFragment = (
  { __typename?: 'PriceRange' }
  & { minimum_price: (
    { __typename?: 'ProductPrice' }
    & { regular_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    ), final_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    ), discount?: Maybe<(
      { __typename?: 'ProductDiscount' }
      & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
    )> }
  ), maximum_price?: Maybe<(
    { __typename?: 'ProductPrice' }
    & { regular_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    ), final_price: (
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    ), discount?: Maybe<(
      { __typename?: 'ProductDiscount' }
      & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
    )> }
  )> }
);

export type TrustpilotBusinessReviewsResponseFragment = (
  { __typename?: 'TrustpilotBusinessReviewsResponse' }
  & Pick<TrustpilotBusinessReviewsResponse, 'stars' | 'trust_score' | 'display_name' | 'website_url'>
  & { number_of_reviews?: Maybe<(
    { __typename?: 'TrustpilotBusinessReviewsSummary' }
    & Pick<TrustpilotBusinessReviewsSummary, 'total' | 'one_star' | 'two_stars' | 'three_stars' | 'four_stars' | 'five_stars'>
  )>, reviews?: Maybe<Array<Maybe<(
    { __typename?: 'TrustpilotBusinessReviews' }
    & Pick<TrustpilotBusinessReviews, 'stars' | 'created_at' | 'title' | 'content' | 'review_url' | 'consumer_display_name' | 'company_response'>
  )>>> }
);

type BedKingdomWishlistItem_BundleWishlistItem_Fragment = (
  { __typename?: 'BundleWishlistItem' }
  & Pick<BundleWishlistItem, 'id' | 'quantity'>
  & { product?: Maybe<(
    { __typename?: 'AmGiftCardProduct' }
    & BedKingdomProductItem_AmGiftCardProduct_Fragment
  ) | (
    { __typename?: 'BundleProduct' }
    & BedKingdomProductItem_BundleProduct_Fragment
  ) | (
    { __typename?: 'ConfigurableProduct' }
    & BedKingdomProductItem_ConfigurableProduct_Fragment
  ) | (
    { __typename?: 'DownloadableProduct' }
    & BedKingdomProductItem_DownloadableProduct_Fragment
  ) | (
    { __typename?: 'GroupedProduct' }
    & BedKingdomProductItem_GroupedProduct_Fragment
  ) | (
    { __typename?: 'SimpleProduct' }
    & BedKingdomProductItem_SimpleProduct_Fragment
  ) | (
    { __typename?: 'VirtualProduct' }
    & BedKingdomProductItem_VirtualProduct_Fragment
  )> }
);

type BedKingdomWishlistItem_ConfigurableWishlistItem_Fragment = (
  { __typename?: 'ConfigurableWishlistItem' }
  & Pick<ConfigurableWishlistItem, 'id' | 'quantity'>
  & { product?: Maybe<(
    { __typename?: 'AmGiftCardProduct' }
    & BedKingdomProductItem_AmGiftCardProduct_Fragment
  ) | (
    { __typename?: 'BundleProduct' }
    & BedKingdomProductItem_BundleProduct_Fragment
  ) | (
    { __typename?: 'ConfigurableProduct' }
    & BedKingdomProductItem_ConfigurableProduct_Fragment
  ) | (
    { __typename?: 'DownloadableProduct' }
    & BedKingdomProductItem_DownloadableProduct_Fragment
  ) | (
    { __typename?: 'GroupedProduct' }
    & BedKingdomProductItem_GroupedProduct_Fragment
  ) | (
    { __typename?: 'SimpleProduct' }
    & BedKingdomProductItem_SimpleProduct_Fragment
  ) | (
    { __typename?: 'VirtualProduct' }
    & BedKingdomProductItem_VirtualProduct_Fragment
  )> }
);

type BedKingdomWishlistItem_DownloadableWishlistItem_Fragment = (
  { __typename?: 'DownloadableWishlistItem' }
  & Pick<DownloadableWishlistItem, 'id' | 'quantity'>
  & { product?: Maybe<(
    { __typename?: 'AmGiftCardProduct' }
    & BedKingdomProductItem_AmGiftCardProduct_Fragment
  ) | (
    { __typename?: 'BundleProduct' }
    & BedKingdomProductItem_BundleProduct_Fragment
  ) | (
    { __typename?: 'ConfigurableProduct' }
    & BedKingdomProductItem_ConfigurableProduct_Fragment
  ) | (
    { __typename?: 'DownloadableProduct' }
    & BedKingdomProductItem_DownloadableProduct_Fragment
  ) | (
    { __typename?: 'GroupedProduct' }
    & BedKingdomProductItem_GroupedProduct_Fragment
  ) | (
    { __typename?: 'SimpleProduct' }
    & BedKingdomProductItem_SimpleProduct_Fragment
  ) | (
    { __typename?: 'VirtualProduct' }
    & BedKingdomProductItem_VirtualProduct_Fragment
  )> }
);

type BedKingdomWishlistItem_GroupedProductWishlistItem_Fragment = (
  { __typename?: 'GroupedProductWishlistItem' }
  & Pick<GroupedProductWishlistItem, 'id' | 'quantity'>
  & { product?: Maybe<(
    { __typename?: 'AmGiftCardProduct' }
    & BedKingdomProductItem_AmGiftCardProduct_Fragment
  ) | (
    { __typename?: 'BundleProduct' }
    & BedKingdomProductItem_BundleProduct_Fragment
  ) | (
    { __typename?: 'ConfigurableProduct' }
    & BedKingdomProductItem_ConfigurableProduct_Fragment
  ) | (
    { __typename?: 'DownloadableProduct' }
    & BedKingdomProductItem_DownloadableProduct_Fragment
  ) | (
    { __typename?: 'GroupedProduct' }
    & BedKingdomProductItem_GroupedProduct_Fragment
  ) | (
    { __typename?: 'SimpleProduct' }
    & BedKingdomProductItem_SimpleProduct_Fragment
  ) | (
    { __typename?: 'VirtualProduct' }
    & BedKingdomProductItem_VirtualProduct_Fragment
  )> }
);

type BedKingdomWishlistItem_SimpleWishlistItem_Fragment = (
  { __typename?: 'SimpleWishlistItem' }
  & Pick<SimpleWishlistItem, 'id' | 'quantity'>
  & { product?: Maybe<(
    { __typename?: 'AmGiftCardProduct' }
    & BedKingdomProductItem_AmGiftCardProduct_Fragment
  ) | (
    { __typename?: 'BundleProduct' }
    & BedKingdomProductItem_BundleProduct_Fragment
  ) | (
    { __typename?: 'ConfigurableProduct' }
    & BedKingdomProductItem_ConfigurableProduct_Fragment
  ) | (
    { __typename?: 'DownloadableProduct' }
    & BedKingdomProductItem_DownloadableProduct_Fragment
  ) | (
    { __typename?: 'GroupedProduct' }
    & BedKingdomProductItem_GroupedProduct_Fragment
  ) | (
    { __typename?: 'SimpleProduct' }
    & BedKingdomProductItem_SimpleProduct_Fragment
  ) | (
    { __typename?: 'VirtualProduct' }
    & BedKingdomProductItem_VirtualProduct_Fragment
  )> }
);

type BedKingdomWishlistItem_VirtualWishlistItem_Fragment = (
  { __typename?: 'VirtualWishlistItem' }
  & Pick<VirtualWishlistItem, 'id' | 'quantity'>
  & { product?: Maybe<(
    { __typename?: 'AmGiftCardProduct' }
    & BedKingdomProductItem_AmGiftCardProduct_Fragment
  ) | (
    { __typename?: 'BundleProduct' }
    & BedKingdomProductItem_BundleProduct_Fragment
  ) | (
    { __typename?: 'ConfigurableProduct' }
    & BedKingdomProductItem_ConfigurableProduct_Fragment
  ) | (
    { __typename?: 'DownloadableProduct' }
    & BedKingdomProductItem_DownloadableProduct_Fragment
  ) | (
    { __typename?: 'GroupedProduct' }
    & BedKingdomProductItem_GroupedProduct_Fragment
  ) | (
    { __typename?: 'SimpleProduct' }
    & BedKingdomProductItem_SimpleProduct_Fragment
  ) | (
    { __typename?: 'VirtualProduct' }
    & BedKingdomProductItem_VirtualProduct_Fragment
  )> }
);

export type BedKingdomWishlistItemFragment = BedKingdomWishlistItem_BundleWishlistItem_Fragment | BedKingdomWishlistItem_ConfigurableWishlistItem_Fragment | BedKingdomWishlistItem_DownloadableWishlistItem_Fragment | BedKingdomWishlistItem_GroupedProductWishlistItem_Fragment | BedKingdomWishlistItem_SimpleWishlistItem_Fragment | BedKingdomWishlistItem_VirtualWishlistItem_Fragment;

export type AddAmGiftCardCodeToAccountMutationVariables = Exact<{
  amGiftcardCode: Scalars['String'];
}>;


export type AddAmGiftCardCodeToAccountMutation = (
  { __typename?: 'Mutation' }
  & { addAmGiftCardCodeToAccount?: Maybe<(
    { __typename?: 'AmGiftCardMutationCommonOutput' }
    & Pick<AmGiftCardMutationCommonOutput, 'error' | 'message'>
  )> }
);

export type AddBedProductQuestionMutationVariables = Exact<{
  input?: Maybe<ProductQuestionInput>;
}>;


export type AddBedProductQuestionMutation = (
  { __typename?: 'Mutation' }
  & { addProductQuestion?: Maybe<(
    { __typename?: 'ProductQuestionOutput' }
    & Pick<ProductQuestionOutput, 'code' | 'message'>
  )> }
);

export type AddBedProductsToWishlistMutationVariables = Exact<{
  wishlistId: Scalars['ID'];
  wishlistItems: Array<WishlistItemInput> | WishlistItemInput;
}>;


export type AddBedProductsToWishlistMutation = (
  { __typename?: 'Mutation' }
  & { addProductsToWishlist?: Maybe<(
    { __typename?: 'AddProductsToWishlistOutput' }
    & { wishlist: (
      { __typename?: 'Wishlist' }
      & Pick<Wishlist, 'id' | 'items_count'>
      & { items_v2?: Maybe<(
        { __typename?: 'WishlistItems' }
        & { items: Array<Maybe<(
          { __typename?: 'BundleWishlistItem' }
          & BedKingdomWishlistItem_BundleWishlistItem_Fragment
        ) | (
          { __typename?: 'ConfigurableWishlistItem' }
          & BedKingdomWishlistItem_ConfigurableWishlistItem_Fragment
        ) | (
          { __typename?: 'DownloadableWishlistItem' }
          & BedKingdomWishlistItem_DownloadableWishlistItem_Fragment
        ) | (
          { __typename?: 'GroupedProductWishlistItem' }
          & BedKingdomWishlistItem_GroupedProductWishlistItem_Fragment
        ) | (
          { __typename?: 'SimpleWishlistItem' }
          & BedKingdomWishlistItem_SimpleWishlistItem_Fragment
        ) | (
          { __typename?: 'VirtualWishlistItem' }
          & BedKingdomWishlistItem_VirtualWishlistItem_Fragment
        )>> }
      )> }
    ), user_errors: Array<Maybe<(
      { __typename?: 'WishListUserInputError' }
      & Pick<WishListUserInputError, 'code' | 'message'>
    )>> }
  )> }
);

export type AmCustomFormSubmitMutationVariables = Exact<{
  form_data?: Maybe<Scalars['String']>;
}>;


export type AmCustomFormSubmitMutation = (
  { __typename?: 'Mutation' }
  & { amCustomFormSubmit?: Maybe<(
    { __typename?: 'AmFormSubmitOutput' }
    & Pick<AmFormSubmitOutput, 'status'>
  )> }
);

export type ApplyAmGiftCardToCartMutationVariables = Exact<{
  input?: Maybe<ApplyAmGiftCardToCartInput>;
}>;


export type ApplyAmGiftCardToCartMutation = (
  { __typename?: 'Mutation' }
  & { applyAmGiftCardToCart?: Maybe<(
    { __typename?: 'ApplyAmGiftCardToCartOutput' }
    & { cart: (
      { __typename?: 'Cart' }
      & BedCartDataFragment
    ) }
  )> }
);

export type ContactSubmitMutationVariables = Exact<{
  form_data?: Maybe<Scalars['String']>;
}>;


export type ContactSubmitMutation = (
  { __typename?: 'Mutation' }
  & { contactSubmit?: Maybe<(
    { __typename?: 'ContactSubmitOutput' }
    & Pick<ContactSubmitOutput, 'code' | 'message'>
  )> }
);

export type CreateBedKingdomCustomerAddressMutationVariables = Exact<{
  input: CustomerAddressInput;
}>;


export type CreateBedKingdomCustomerAddressMutation = (
  { __typename?: 'Mutation' }
  & { createCustomerAddress?: Maybe<(
    { __typename?: 'CustomerAddress' }
    & BedKingdomCustomerAddFragment
  )> }
);

export type CreateCustomerV2MutationVariables = Exact<{
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  is_subscribed: Scalars['Boolean'];
  allow_remote_shopping_assistance: Scalars['Boolean'];
}>;


export type CreateCustomerV2Mutation = (
  { __typename?: 'Mutation' }
  & { createCustomerV2?: Maybe<(
    { __typename?: 'CustomerOutput' }
    & { customer: (
      { __typename?: 'Customer' }
      & Pick<Customer, 'id'>
    ) }
  )> }
);

export type GdprAnonymisePerformMutationVariables = Exact<{ [key: string]: never; }>;


export type GdprAnonymisePerformMutation = (
  { __typename?: 'Mutation' }
  & { gdprAnonymisePerform?: Maybe<(
    { __typename?: 'GdprAnonymisePerformOutput' }
    & Pick<GdprAnonymisePerformOutput, 'error' | 'message'>
  )> }
);

export type RemoveAmGiftCardCodeToAccountMutationVariables = Exact<{
  amGiftcardCode: Scalars['String'];
}>;


export type RemoveAmGiftCardCodeToAccountMutation = (
  { __typename?: 'Mutation' }
  & { removeAmGiftCardCodeToAccount?: Maybe<(
    { __typename?: 'AmGiftCardMutationCommonOutput' }
    & Pick<AmGiftCardMutationCommonOutput, 'error' | 'message'>
  )> }
);

export type RemoveAmGiftCardFromCartMutationVariables = Exact<{
  input?: Maybe<RemoveAmGiftCardFromCartInput>;
}>;


export type RemoveAmGiftCardFromCartMutation = (
  { __typename?: 'Mutation' }
  & { removeAmGiftCardFromCart?: Maybe<(
    { __typename?: 'RemoveAmGiftCardFromCartOutput' }
    & { cart: (
      { __typename?: 'Cart' }
      & BedCartDataFragment
    ) }
  )> }
);

export type RemoveItemsFromCartMutationVariables = Exact<{
  cartid: Scalars['String'];
  cartItems: Array<Maybe<CartItemUpdateInput>> | Maybe<CartItemUpdateInput>;
}>;


export type RemoveItemsFromCartMutation = (
  { __typename?: 'Mutation' }
  & { removeItemsFromCart?: Maybe<(
    { __typename?: 'RemoveItemFromCartOutput' }
    & { cart: (
      { __typename?: 'Cart' }
      & Pick<Cart, 'id' | 'total_quantity'>
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'AmGiftCardCartItem' }
        & Pick<AmGiftCardCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
        & { prices?: Maybe<(
          { __typename?: 'CartItemPrices' }
          & { row_total_including_tax: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), price: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>, product: (
          { __typename: 'AmGiftCardProduct' }
          & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'BundleProduct' }
          & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'ConfigurableProduct' }
          & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'DownloadableProduct' }
          & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'GroupedProduct' }
          & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'SimpleProduct' }
          & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'VirtualProduct' }
          & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) }
      ) | (
        { __typename?: 'BundleCartItem' }
        & Pick<BundleCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
        & { prices?: Maybe<(
          { __typename?: 'CartItemPrices' }
          & { row_total_including_tax: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), price: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>, product: (
          { __typename: 'AmGiftCardProduct' }
          & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'BundleProduct' }
          & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'ConfigurableProduct' }
          & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'DownloadableProduct' }
          & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'GroupedProduct' }
          & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'SimpleProduct' }
          & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'VirtualProduct' }
          & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) }
      ) | (
        { __typename?: 'ConfigurableCartItem' }
        & Pick<ConfigurableCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
        & { configurable_options: Array<Maybe<(
          { __typename?: 'SelectedConfigurableOption' }
          & Pick<SelectedConfigurableOption, 'configurable_product_option_uid' | 'option_label' | 'configurable_product_option_value_uid' | 'value_label'>
        )>>, prices?: Maybe<(
          { __typename?: 'CartItemPrices' }
          & { row_total_including_tax: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), price: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>, product: (
          { __typename: 'AmGiftCardProduct' }
          & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'BundleProduct' }
          & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'ConfigurableProduct' }
          & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'DownloadableProduct' }
          & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'GroupedProduct' }
          & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'SimpleProduct' }
          & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'VirtualProduct' }
          & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) }
      ) | (
        { __typename?: 'DownloadableCartItem' }
        & Pick<DownloadableCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
        & { prices?: Maybe<(
          { __typename?: 'CartItemPrices' }
          & { row_total_including_tax: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), price: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>, product: (
          { __typename: 'AmGiftCardProduct' }
          & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'BundleProduct' }
          & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'ConfigurableProduct' }
          & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'DownloadableProduct' }
          & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'GroupedProduct' }
          & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'SimpleProduct' }
          & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'VirtualProduct' }
          & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) }
      ) | (
        { __typename?: 'SimpleCartItem' }
        & Pick<SimpleCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
        & { customizable_options: Array<Maybe<(
          { __typename?: 'SelectedCustomizableOption' }
          & Pick<SelectedCustomizableOption, 'label' | 'customizable_option_uid' | 'is_required' | 'sort_order' | 'type'>
          & { values: Array<Maybe<(
            { __typename?: 'SelectedCustomizableOptionValue' }
            & Pick<SelectedCustomizableOptionValue, 'customizable_option_value_uid' | 'label' | 'value'>
            & { price: (
              { __typename?: 'CartItemSelectedOptionValuePrice' }
              & Pick<CartItemSelectedOptionValuePrice, 'type' | 'units' | 'value'>
            ) }
          )>> }
        )>>, prices?: Maybe<(
          { __typename?: 'CartItemPrices' }
          & { row_total_including_tax: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), price: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>, product: (
          { __typename: 'AmGiftCardProduct' }
          & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'BundleProduct' }
          & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'ConfigurableProduct' }
          & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'DownloadableProduct' }
          & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'GroupedProduct' }
          & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'SimpleProduct' }
          & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'VirtualProduct' }
          & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) }
      ) | (
        { __typename?: 'VirtualCartItem' }
        & Pick<VirtualCartItem, 'id' | 'uid' | 'date_picker' | 'delivery_warning' | 'quantity'>
        & { prices?: Maybe<(
          { __typename?: 'CartItemPrices' }
          & { row_total_including_tax: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), price: (
            { __typename?: 'Money' }
            & Pick<Money, 'value' | 'currency'>
          ) }
        )>, product: (
          { __typename: 'AmGiftCardProduct' }
          & Pick<AmGiftCardProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'BundleProduct' }
          & Pick<BundleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'ConfigurableProduct' }
          & Pick<ConfigurableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'DownloadableProduct' }
          & Pick<DownloadableProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'GroupedProduct' }
          & Pick<GroupedProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'SimpleProduct' }
          & Pick<SimpleProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) | (
          { __typename: 'VirtualProduct' }
          & Pick<VirtualProduct, 'id' | 'name' | 'sku' | 'url_key'>
          & { small_image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url' | 'label'>
          )>, image?: Maybe<(
            { __typename?: 'ProductImage' }
            & Pick<ProductImage, 'url'>
          )>, bed_data?: Maybe<(
            { __typename?: 'BedData' }
            & { bed_category_product_image?: Maybe<Array<Maybe<(
              { __typename?: 'BedProductImage' }
              & Pick<BedProductImage, 'url' | 'url_mobile' | 'label'>
            )>>> }
          )>, price?: Maybe<(
            { __typename?: 'ProductPrices' }
            & { regularPrice?: Maybe<(
              { __typename?: 'Price' }
              & { amount?: Maybe<(
                { __typename?: 'Money' }
                & Pick<Money, 'value' | 'currency'>
              )> }
            )> }
          )>, price_range: (
            { __typename?: 'PriceRange' }
            & { maximum_price?: Maybe<(
              { __typename?: 'ProductPrice' }
              & { regular_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), discount?: Maybe<(
                { __typename?: 'ProductDiscount' }
                & Pick<ProductDiscount, 'amount_off' | 'percent_off'>
              )>, final_price: (
                { __typename?: 'Money' }
                & Pick<Money, 'currency' | 'value'>
              ), fixed_product_taxes?: Maybe<Array<Maybe<(
                { __typename?: 'FixedProductTax' }
                & Pick<FixedProductTax, 'label'>
                & { amount?: Maybe<(
                  { __typename?: 'Money' }
                  & Pick<Money, 'currency' | 'value'>
                )> }
              )>>> }
            )> }
          ) }
        ) }
      )>>>, prices?: Maybe<(
        { __typename?: 'CartPrices' }
        & { grand_total?: Maybe<(
          { __typename?: 'Money' }
          & Pick<Money, 'value' | 'currency'>
        )>, discounts?: Maybe<Array<Maybe<(
          { __typename?: 'Discount' }
          & Pick<Discount, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ) }
        )>>>, subtotal_including_tax?: Maybe<(
          { __typename?: 'Money' }
          & Pick<Money, 'currency' | 'value'>
        )>, applied_taxes?: Maybe<Array<Maybe<(
          { __typename?: 'CartTaxItem' }
          & Pick<CartTaxItem, 'label'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ) }
        )>>> }
      )>, applied_coupons?: Maybe<Array<Maybe<(
        { __typename?: 'AppliedCoupon' }
        & Pick<AppliedCoupon, 'code'>
      )>>>, selected_payment_method?: Maybe<(
        { __typename?: 'SelectedPaymentMethod' }
        & Pick<SelectedPaymentMethod, 'code' | 'title'>
      )>, available_payment_methods?: Maybe<Array<Maybe<(
        { __typename?: 'AvailablePaymentMethod' }
        & Pick<AvailablePaymentMethod, 'code' | 'title'>
      )>>>, shipping_addresses: Array<Maybe<(
        { __typename?: 'ShippingCartAddress' }
        & Pick<ShippingCartAddress, 'city' | 'street' | 'company' | 'customer_notes' | 'firstname' | 'lastname' | 'telephone'>
        & { available_shipping_methods?: Maybe<Array<Maybe<(
          { __typename?: 'AvailableShippingMethod' }
          & Pick<AvailableShippingMethod, 'available' | 'carrier_code' | 'carrier_title' | 'method_code' | 'method_title'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ), price_incl_tax: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ) }
        )>>>, country: (
          { __typename?: 'CartAddressCountry' }
          & Pick<CartAddressCountry, 'code' | 'label'>
        ), selected_shipping_method?: Maybe<(
          { __typename?: 'SelectedShippingMethod' }
          & Pick<SelectedShippingMethod, 'method_title' | 'method_code' | 'carrier_code' | 'carrier_title'>
          & { amount: (
            { __typename?: 'Money' }
            & Pick<Money, 'currency' | 'value'>
          ) }
        )> }
      )>> }
    ) }
  )> }
);

export type UpdateBedKingdomCustomerAddMutationVariables = Exact<{
  id: Scalars['Int'];
  input: CustomerAddressInput;
}>;


export type UpdateBedKingdomCustomerAddMutation = (
  { __typename?: 'Mutation' }
  & { updateCustomerAddress?: Maybe<(
    { __typename?: 'CustomerAddress' }
    & BedKingdomCustomerAddFragment
  )> }
);

export type UpdateBedKingdomCustomerMutationVariables = Exact<{
  input: CustomerInput;
}>;


export type UpdateBedKingdomCustomerMutation = (
  { __typename?: 'Mutation' }
  & { updateCustomer?: Maybe<(
    { __typename?: 'CustomerOutput' }
    & { customer: (
      { __typename?: 'Customer' }
      & BedKingdomCustomerDetailFragment
    ) }
  )> }
);

export type UpdateBedKingdomCustomerV2MutationVariables = Exact<{
  input: CustomerUpdateInput;
}>;


export type UpdateBedKingdomCustomerV2Mutation = (
  { __typename?: 'Mutation' }
  & { updateCustomerV2?: Maybe<(
    { __typename?: 'CustomerOutput' }
    & { customer: (
      { __typename?: 'Customer' }
      & BedKingdomCustomerDetailFragment
    ) }
  )> }
);

export type AddXnotifStockMutationVariables = Exact<{
  input?: Maybe<XnotifInput>;
}>;


export type AddXnotifStockMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'xnotifStock'>
);

export type AmLabelProviderQueryVariables = Exact<{
  productIds?: Maybe<Array<Maybe<Scalars['Int']>> | Maybe<Scalars['Int']>>;
}>;


export type AmLabelProviderQuery = (
  { __typename?: 'Query' }
  & { amLabelProvider?: Maybe<Array<Maybe<(
    { __typename?: 'AmLabelList' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'AmLabel' }
      & Pick<AmLabel, 'label_id' | 'product_id' | 'position' | 'name' | 'txt' | 'image' | 'size' | 'style' | 'is_visible' | 'customer_group_ids'>
      & { tooltip_settings?: Maybe<(
        { __typename?: 'AmLabelTooltip' }
        & Pick<AmLabelTooltip, 'status' | 'color' | 'text_color' | 'text'>
      )> }
    )>>> }
  )>>> }
);

export type AmMostviewedGroupsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AmMostviewedGroupsQuery = (
  { __typename?: 'Query' }
  & { amMostviewedGroups?: Maybe<(
    { __typename?: 'AmMostviewedRelatedRules' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'AmMostviewedRelated' }
      & Pick<AmMostviewedRelated, 'block_title' | 'block_layout' | 'add_to_cart' | 'position'>
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'AmGiftCardProduct' }
        & BedKingdomProductItemMostViewed_AmGiftCardProduct_Fragment
      ) | (
        { __typename?: 'BundleProduct' }
        & BedKingdomProductItemMostViewed_BundleProduct_Fragment
      ) | (
        { __typename?: 'ConfigurableProduct' }
        & BedKingdomProductItemMostViewed_ConfigurableProduct_Fragment
      ) | (
        { __typename?: 'DownloadableProduct' }
        & BedKingdomProductItemMostViewed_DownloadableProduct_Fragment
      ) | (
        { __typename?: 'GroupedProduct' }
        & BedKingdomProductItemMostViewed_GroupedProduct_Fragment
      ) | (
        { __typename?: 'SimpleProduct' }
        & BedKingdomProductItemMostViewed_SimpleProduct_Fragment
      ) | (
        { __typename?: 'VirtualProduct' }
        & BedKingdomProductItemMostViewed_VirtualProduct_Fragment
      )>>> }
    )>>> }
  )> }
);

export type AmUserGiftCardAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type AmUserGiftCardAccountQuery = (
  { __typename?: 'Query' }
  & { amUserGiftCardAccount?: Maybe<Array<Maybe<(
    { __typename?: 'AmGiftCardAccount' }
    & Pick<AmGiftCardAccount, 'code' | 'expiration_date' | 'status'>
    & { current_balance?: Maybe<(
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    )> }
  )>>> }
);

export type CalculateDeliveryNextDayQueryVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type CalculateDeliveryNextDayQuery = (
  { __typename?: 'Query' }
  & { calculateDeliveryNextDay?: Maybe<(
    { __typename?: 'DeliveryNextDay' }
    & Pick<DeliveryNextDay, 'limit_dates' | 'min_date'>
  )> }
);

export type CheckAmGiftCardAccountQueryVariables = Exact<{
  input: AmGiftCardAccountInput;
}>;


export type CheckAmGiftCardAccountQuery = (
  { __typename?: 'Query' }
  & { amGiftCardAccount?: Maybe<(
    { __typename?: 'AmGiftCardAccount' }
    & Pick<AmGiftCardAccount, 'code' | 'expiration_date' | 'status'>
    & { current_balance?: Maybe<(
      { __typename?: 'Money' }
      & Pick<Money, 'value' | 'currency'>
    )> }
  )> }
);

export type CustomAttributeMetadataQueryVariables = Exact<{
  attributes: Array<AttributeInput> | AttributeInput;
}>;


export type CustomAttributeMetadataQuery = (
  { __typename?: 'Query' }
  & { customAttributeMetadata?: Maybe<(
    { __typename?: 'CustomAttributeMetadata' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'attribute_code' | 'attribute_type' | 'entity_type' | 'input_type'>
      & { attribute_options?: Maybe<Array<Maybe<(
        { __typename?: 'AttributeOption' }
        & Pick<AttributeOption, 'value' | 'label'>
      )>>> }
    )>>> }
  )> }
);

export type CustomformQueryVariables = Exact<{
  formId?: Maybe<Scalars['Int']>;
}>;


export type CustomformQuery = (
  { __typename?: 'Query' }
  & { customform?: Maybe<(
    { __typename?: 'Form' }
    & Pick<Form, 'form_id' | 'title' | 'code' | 'success_url' | 'status' | 'created_at' | 'customer_group' | 'store_id' | 'send_notification' | 'send_to' | 'submit_button' | 'success_message' | 'form_json' | 'email_field' | 'email_field_hide' | 'popup_show' | 'popup_button' | 'form_title' | 'gdpr_enabled' | 'gdpr_text' | 'advanced_google_key' | 'advanced_date_format' | 'is_form_available' | 'isSurvey'>
  )> }
);

export type GetAmastyPageQueryVariables = Exact<{
  pageId: Scalars['Int'];
}>;


export type GetAmastyPageQuery = (
  { __typename?: 'Query' }
  & { amlanding?: Maybe<(
    { __typename?: 'Landing' }
    & Pick<Landing, 'page_id' | 'title' | 'identifier' | 'page_layout' | 'layout_columns_count' | 'layout_include_navigation' | 'layout_heading' | 'layout_file' | 'layout_file_alt' | 'layout_top_description' | 'layout_bottom_description' | 'layout_static_top' | 'layout_static_bottom' | 'default_sort_by' | 'creation_time' | 'update_time' | 'is_active' | 'dynamic_category_id' | 'dynamic_category_url' | 'sort_order' | 'layout_update_xml' | 'conditions_serialized' | 'meta_data' | 'store_id'>
  )> }
);

export type GetBedKingdomAutocompleteResultsQueryVariables = Exact<{
  inputText: Scalars['String'];
  pageSize?: Maybe<Scalars['Int']>;
}>;


export type GetBedKingdomAutocompleteResultsQuery = (
  { __typename?: 'Query' }
  & { products?: Maybe<(
    { __typename?: 'Products' }
    & Pick<Products, 'total_count'>
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'AmGiftCardProduct' }
      & BedKingdomProductItem_AmGiftCardProduct_Fragment
    ) | (
      { __typename?: 'BundleProduct' }
      & BedKingdomProductItem_BundleProduct_Fragment
    ) | (
      { __typename?: 'ConfigurableProduct' }
      & BedKingdomProductItem_ConfigurableProduct_Fragment
    ) | (
      { __typename?: 'DownloadableProduct' }
      & BedKingdomProductItem_DownloadableProduct_Fragment
    ) | (
      { __typename?: 'GroupedProduct' }
      & BedKingdomProductItem_GroupedProduct_Fragment
    ) | (
      { __typename?: 'SimpleProduct' }
      & BedKingdomProductItem_SimpleProduct_Fragment
    ) | (
      { __typename?: 'VirtualProduct' }
      & BedKingdomProductItem_VirtualProduct_Fragment
    )>>>, page_info?: Maybe<(
      { __typename?: 'SearchResultPageInfo' }
      & Pick<SearchResultPageInfo, 'total_pages'>
    )> }
  )> }
);

export type GetBedKingdomCatalogProductsQueryVariables = Exact<{
  search: Scalars['String'];
  filter: ProductAttributeFilterInput;
  pageSize: Scalars['Int'];
  currentPage: Scalars['Int'];
  sort?: Maybe<ProductAttributeSortInput>;
}>;


export type GetBedKingdomCatalogProductsQuery = (
  { __typename?: 'Query' }
  & { products?: Maybe<(
    { __typename?: 'Products' }
    & Pick<Products, 'rich_snippets' | 'total_count'>
    & { aggregations?: Maybe<Array<Maybe<(
      { __typename?: 'Aggregation' }
      & Pick<Aggregation, 'attribute_code' | 'label'>
      & { options?: Maybe<Array<Maybe<(
        { __typename?: 'AggregationOption' }
        & Pick<AggregationOption, 'count' | 'label' | 'value'>
      )>>> }
    )>>>, page_info?: Maybe<(
      { __typename?: 'SearchResultPageInfo' }
      & Pick<SearchResultPageInfo, 'current_page' | 'page_size' | 'total_pages'>
    )>, items?: Maybe<Array<Maybe<(
      { __typename?: 'AmGiftCardProduct' }
      & BedKingdomProductItem_AmGiftCardProduct_Fragment
    ) | (
      { __typename?: 'BundleProduct' }
      & BedKingdomProductItem_BundleProduct_Fragment
    ) | (
      { __typename?: 'ConfigurableProduct' }
      & BedKingdomProductItem_ConfigurableProduct_Fragment
    ) | (
      { __typename?: 'DownloadableProduct' }
      & BedKingdomProductItem_DownloadableProduct_Fragment
    ) | (
      { __typename?: 'GroupedProduct' }
      & BedKingdomProductItem_GroupedProduct_Fragment
    ) | (
      { __typename?: 'SimpleProduct' }
      & BedKingdomProductItem_SimpleProduct_Fragment
    ) | (
      { __typename?: 'VirtualProduct' }
      & BedKingdomProductItem_VirtualProduct_Fragment
    )>>> }
  )> }
);

export type GetBedKingdomCategoryDetailForListingQueryVariables = Exact<{
  category_id: Scalars['Int'];
}>;


export type GetBedKingdomCategoryDetailForListingQuery = (
  { __typename?: 'Query' }
  & { category?: Maybe<(
    { __typename?: 'CategoryTree' }
    & Pick<CategoryTree, 'id' | 'name' | 'description' | 'url_path' | 'url_key' | 'url_suffix' | 'meta_title' | 'meta_keywords' | 'meta_description'>
    & { breadcrumbs?: Maybe<Array<Maybe<(
      { __typename?: 'Breadcrumb' }
      & Pick<Breadcrumb, 'category_id' | 'category_level' | 'category_name' | 'category_url_path'>
    )>>>, children?: Maybe<Array<Maybe<(
      { __typename?: 'CategoryTree' }
      & Pick<CategoryTree, 'id' | 'name' | 'url_path' | 'url_key'>
    )>>> }
  )> }
);

export type GetHomePageCategoriesQueryVariables = Exact<{
  filters?: Maybe<CategoryFilterInput>;
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
}>;


export type GetHomePageCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories?: Maybe<(
    { __typename?: 'CategoryResult' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'CategoryTree' }
      & Pick<CategoryTree, 'uid' | 'name' | 'url_key'>
      & { products?: Maybe<(
        { __typename?: 'CategoryProducts' }
        & { items?: Maybe<Array<Maybe<(
          { __typename?: 'AmGiftCardProduct' }
          & BedKingdomProductItem_AmGiftCardProduct_Fragment
        ) | (
          { __typename?: 'BundleProduct' }
          & BedKingdomProductItem_BundleProduct_Fragment
        ) | (
          { __typename?: 'ConfigurableProduct' }
          & BedKingdomProductItem_ConfigurableProduct_Fragment
        ) | (
          { __typename?: 'DownloadableProduct' }
          & BedKingdomProductItem_DownloadableProduct_Fragment
        ) | (
          { __typename?: 'GroupedProduct' }
          & BedKingdomProductItem_GroupedProduct_Fragment
        ) | (
          { __typename?: 'SimpleProduct' }
          & BedKingdomProductItem_SimpleProduct_Fragment
        ) | (
          { __typename?: 'VirtualProduct' }
          & BedKingdomProductItem_VirtualProduct_Fragment
        )>>> }
      )> }
    )>>> }
  )> }
);

export type GetBedKingdomCustomerOrdersQueryVariables = Exact<{
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<CustomerOrdersFilterInput>;
}>;


export type GetBedKingdomCustomerOrdersQuery = (
  { __typename?: 'Query' }
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & { orders?: Maybe<(
      { __typename?: 'CustomerOrders' }
      & Pick<CustomerOrders, 'total_count'>
      & { items: Array<Maybe<(
        { __typename?: 'CustomerOrder' }
        & BedKingdomCustomerOrderFragment
      )>>, page_info?: Maybe<(
        { __typename?: 'SearchResultPageInfo' }
        & Pick<SearchResultPageInfo, 'current_page' | 'page_size' | 'total_pages'>
      )> }
    )> }
  )> }
);

export type GetBedKingdomCustomerOrdersDetailsQueryVariables = Exact<{
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  filter?: Maybe<CustomerOrdersFilterInput>;
}>;


export type GetBedKingdomCustomerOrdersDetailsQuery = (
  { __typename?: 'Query' }
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & { orders?: Maybe<(
      { __typename?: 'CustomerOrders' }
      & Pick<CustomerOrders, 'total_count'>
      & { items: Array<Maybe<(
        { __typename?: 'CustomerOrder' }
        & BedKingdomCustomerOrderDetailsFragment
      )>>, page_info?: Maybe<(
        { __typename?: 'SearchResultPageInfo' }
        & Pick<SearchResultPageInfo, 'current_page' | 'page_size' | 'total_pages'>
      )> }
    )> }
  )> }
);

export type GetBedKingdomHomeBannerQueryVariables = Exact<{
  sliderId: Scalars['Int'];
}>;


export type GetBedKingdomHomeBannerQuery = (
  { __typename?: 'Query' }
  & { getBannerHomepage?: Maybe<(
    { __typename?: 'OwlCarouselSliderOutput' }
    & Pick<OwlCarouselSliderOutput, 'slider_id' | 'media_url'>
    & { slider_config?: Maybe<(
      { __typename?: 'SliderConfig' }
      & Pick<SliderConfig, 'title' | 'show_title' | 'status' | 'dots' | 'thumbs' | 'center' | 'items'>
    )>, banner_config?: Maybe<Array<Maybe<(
      { __typename?: 'BannerConfig' }
      & Pick<BannerConfig, 'id' | 'title' | 'status' | 'url' | 'wrap_link' | 'banner_type'>
      & { image?: Maybe<(
        { __typename?: 'ImageDetail' }
        & Pick<ImageDetail, 'img' | 'height' | 'width'>
      )>, mobile_image?: Maybe<(
        { __typename?: 'ImageDetail' }
        & Pick<ImageDetail, 'img' | 'height' | 'width'>
      )>, thumb_image?: Maybe<(
        { __typename?: 'ImageDetail' }
        & Pick<ImageDetail, 'img' | 'height' | 'width'>
      )> }
    )>>>, breakpoint_config?: Maybe<(
      { __typename?: 'BreakpointConfig' }
      & Pick<BreakpointConfig, 'breakpoint_1' | 'breakpoint_2' | 'breakpoint_3' | 'breakpoint_4'>
    )> }
  )> }
);

export type GetBedKingdomMegaMenuQueryVariables = Exact<{
  menuId: Scalars['Int'];
}>;


export type GetBedKingdomMegaMenuQuery = (
  { __typename?: 'Query' }
  & { getMenuItems?: Maybe<Array<Maybe<(
    { __typename?: 'MegamenuItemsOutput' }
    & { children?: Maybe<Array<Maybe<(
      { __typename?: 'MegamenuItemsOutput' }
      & { children?: Maybe<Array<Maybe<(
        { __typename?: 'MegamenuItemsOutput' }
        & { children?: Maybe<Array<Maybe<(
          { __typename?: 'MegamenuItemsOutput' }
          & MegaMenuItemFragment
        )>>> }
        & MegaMenuItemFragment
      )>>> }
      & MegaMenuItemFragment
    )>>> }
    & MegaMenuItemFragment
  )>>> }
);

export type GetBedKingdomMegaMenuSsrQueryVariables = Exact<{
  menuId: Scalars['Int'];
}>;


export type GetBedKingdomMegaMenuSsrQuery = (
  { __typename?: 'Query' }
  & { getMenuItems?: Maybe<Array<Maybe<(
    { __typename?: 'MegamenuItemsOutput' }
    & MegaMenuItemFragment
  )>>> }
);

export type GetBedProductAttachmentsQueryVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type GetBedProductAttachmentsQuery = (
  { __typename?: 'Query' }
  & { getProductAttachments?: Maybe<Array<Maybe<(
    { __typename?: 'ProductAttachment' }
    & Pick<ProductAttachment, 'icon_url' | 'frontend_url' | 'label' | 'file_size' | 'readable_file_size'>
  )>>> }
);

export type GetBedProductMoreInformationQueryVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type GetBedProductMoreInformationQuery = (
  { __typename?: 'Query' }
  & { getProductMoreInformation?: Maybe<Array<Maybe<(
    { __typename?: 'ProductMoreInformation' }
    & Pick<ProductMoreInformation, 'label' | 'value' | 'code'>
  )>>> }
);

export type GetBedProductQuestionsQueryVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type GetBedProductQuestionsQuery = (
  { __typename?: 'Query' }
  & { getProductQuestions?: Maybe<(
    { __typename?: 'ProductQuestion' }
    & Pick<ProductQuestion, 'total'>
    & { question_setting?: Maybe<(
      { __typename?: 'QuestionSetting' }
      & Pick<QuestionSetting, 'page_size' | 'is_show_ask_question_form' | 'is_allow_unregistered_customer_ask' | 'gdpr_enable' | 'gdpr_text' | 'is_notify_user'>
    )>, questions?: Maybe<Array<Maybe<(
      { __typename?: 'AnswerQuestion' }
      & Pick<AnswerQuestion, 'question_id' | 'title' | 'is_show_full_answer' | 'answer' | 'short_answer' | 'question_link'>
    )>>> }
  )> }
);

export type GetBedTrustpilotProductReviewsDetailQueryVariables = Exact<{
  productId: Scalars['Int'];
  pageSize?: Maybe<Scalars['Int']>;
  currentPage?: Maybe<Scalars['Int']>;
  stars?: Maybe<Scalars['String']>;
}>;


export type GetBedTrustpilotProductReviewsDetailQuery = (
  { __typename?: 'Query' }
  & { getTrustpilotProductReviewsDetail?: Maybe<(
    { __typename?: 'TrustpilotProductReviewsDetail' }
    & { trustpilot_product_reviews?: Maybe<Array<Maybe<(
      { __typename?: 'TrustpilotProductReviews' }
      & Pick<TrustpilotProductReviews, 'review_id' | 'product_id' | 'consumer_display_name' | 'content' | 'created_at' | 'stars' | 'attributes'>
    )>>>, trustpilot_attachment_summary?: Maybe<Array<Maybe<(
      { __typename?: 'TrustpilotAttachmentSummary' }
      & Pick<TrustpilotAttachmentSummary, 'attachment_id' | 'product_id' | 'review_id' | 'processed_files'>
    )>>> }
  )> }
);

export type GetBedkingdomBrandListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBedkingdomBrandListQuery = (
  { __typename?: 'Query' }
  & { ambrandlist?: Maybe<(
    { __typename?: 'BrandList' }
    & Pick<BrandList, 'show_images' | 'image_width' | 'image_height' | 'show_search' | 'show_filter' | 'filter_display_all' | 'display_zero' | 'show_count' | 'all_letters'>
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'Brand' }
      & Pick<Brand, 'brandId' | 'label' | 'url' | 'img' | 'image' | 'description' | 'short_description' | 'cnt' | 'alt' | 'letter'>
    )>>>, brand_attribute?: Maybe<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'attribute_code' | 'entity_type' | 'attribute_type'>
    )> }
  )> }
);

export type GetBedkingdomProductDetailByUrlKeyQueryVariables = Exact<{
  urlKey?: Maybe<Scalars['String']>;
}>;


export type GetBedkingdomProductDetailByUrlKeyQuery = (
  { __typename?: 'Query' }
  & { products?: Maybe<(
    { __typename?: 'Products' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'AmGiftCardProduct' }
      & BedKingdomProductDetails_AmGiftCardProduct_Fragment
    ) | (
      { __typename?: 'BundleProduct' }
      & BedKingdomProductDetails_BundleProduct_Fragment
    ) | (
      { __typename?: 'ConfigurableProduct' }
      & BedKingdomProductDetails_ConfigurableProduct_Fragment
    ) | (
      { __typename?: 'DownloadableProduct' }
      & BedKingdomProductDetails_DownloadableProduct_Fragment
    ) | (
      { __typename?: 'GroupedProduct' }
      & BedKingdomProductDetails_GroupedProduct_Fragment
    ) | (
      { __typename?: 'SimpleProduct' }
      & BedKingdomProductDetails_SimpleProduct_Fragment
    ) | (
      { __typename?: 'VirtualProduct' }
      & BedKingdomProductDetails_VirtualProduct_Fragment
    )>>> }
  )> }
);

export type GetBedkingdomStoreConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBedkingdomStoreConfigQuery = (
  { __typename?: 'Query' }
  & { storeConfig?: Maybe<(
    { __typename?: 'StoreConfig' }
    & Pick<StoreConfig, 'default_title' | 'default_description' | 'default_keywords' | 'head_includes' | 'secure_base_url' | 'locale' | 'id'>
  )> }
);

export type GetBedkingdomWishlistDetailQueryVariables = Exact<{
  pageSize: Scalars['Int'];
  currentPage: Scalars['Int'];
}>;


export type GetBedkingdomWishlistDetailQuery = (
  { __typename?: 'Query' }
  & { customer?: Maybe<(
    { __typename?: 'Customer' }
    & { wishlists: Array<Maybe<(
      { __typename?: 'Wishlist' }
      & Pick<Wishlist, 'id' | 'items_count'>
      & { items_v2?: Maybe<(
        { __typename?: 'WishlistItems' }
        & { items: Array<Maybe<(
          { __typename?: 'BundleWishlistItem' }
          & BedKingdomWishlistItem_BundleWishlistItem_Fragment
        ) | (
          { __typename?: 'ConfigurableWishlistItem' }
          & BedKingdomWishlistItem_ConfigurableWishlistItem_Fragment
        ) | (
          { __typename?: 'DownloadableWishlistItem' }
          & BedKingdomWishlistItem_DownloadableWishlistItem_Fragment
        ) | (
          { __typename?: 'GroupedProductWishlistItem' }
          & BedKingdomWishlistItem_GroupedProductWishlistItem_Fragment
        ) | (
          { __typename?: 'SimpleWishlistItem' }
          & BedKingdomWishlistItem_SimpleWishlistItem_Fragment
        ) | (
          { __typename?: 'VirtualWishlistItem' }
          & BedKingdomWishlistItem_VirtualWishlistItem_Fragment
        )>>, page_info?: Maybe<(
          { __typename?: 'SearchResultPageInfo' }
          & Pick<SearchResultPageInfo, 'current_page' | 'page_size' | 'total_pages'>
        )> }
      )> }
    )>> }
  )> }
);

export type GetRichSnippetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRichSnippetsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getRichSnippets'>
);

export type GetGoogleTagManagerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleTagManagerQuery = (
  { __typename?: 'Query' }
  & { getGoogleTagManager?: Maybe<(
    { __typename?: 'GoogleTagManagerScripts' }
    & Pick<GoogleTagManagerScripts, 'head' | 'body' | 'footer'>
  )> }
);

export type GetProductMattressOffersQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetProductMattressOffersQuery = (
  { __typename?: 'Query' }
  & { getProductMattressOffers?: Maybe<Array<Maybe<(
    { __typename?: 'ProductMattressOffers' }
    & Pick<ProductMattressOffers, 'id' | 'name' | 'image' | 'url' | 'description'>
  )>>> }
);

export type GetTopSearchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTopSearchesQuery = (
  { __typename?: 'Query' }
  & { getTopSearches?: Maybe<Array<Maybe<(
    { __typename?: 'SearchTerms' }
    & Pick<SearchTerms, 'query_id' | 'query_text' | 'num_results' | 'popularity' | 'redirect'>
  )>>> }
);

export type GetTrustpilotBusinessReviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTrustpilotBusinessReviewsQuery = (
  { __typename?: 'Query' }
  & { getTrustpilotBusinessReviews?: Maybe<(
    { __typename?: 'TrustpilotBusinessReviewsResponse' }
    & TrustpilotBusinessReviewsResponseFragment
  )> }
);

/** AUTO GENERATED, DO NOT EDIT THIS FILE */