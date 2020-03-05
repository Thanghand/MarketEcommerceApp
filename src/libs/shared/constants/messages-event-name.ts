

export enum MessageEventName {

    // Users
    USERS_LIST_COMPANY = 'users.company',
    USERS_DETAIL = 'users.detail',
    USERS_DELETE = 'users.delete',
    USERS_UPDATE = 'users.update',
    USERS_UPDATE_ENTITY = 'users.update.entity',
    USERS_FIND_BY_EMAIL = 'users.find.email',
    
    AUTH_SIGNIN = 'auth.signin',
    AUTH_SIGNUP = 'auth.signup',
    AUTH_CREATE_USERS = 'auth.createusers',
    AUTH_PASSWORD = 'auth.password',

    // COPMPANY
    COMPANY_DETAIL = 'company.detail',

    // SUPPLIERS
    SUPPLIERS_LIST = 'suppliers.list',
    SUPPLIERS_DETAIL_ENTITY = 'suppliers.detail.entity',
    SUPPLIERS_CREATE = 'suppliers.create',
    SUPPLIERS_UPDATE = 'suppliers.update',
    SUPPLIERS_DELETE = 'suppliers.delete',
    SUPPLIERS_UPDATE_USERS = 'suppliers.update.users',

    // RESTAURANTS
    RESTAURANTS_LIST = 'restaurants.list',
    RESTAURANTS_DETAIl_ENTITY = 'restaurants.detail.entity',
    RESTAURANTS_DETAIl_RESPONSE = 'restaurants.detail.response',
    RESTAURANTS_CREATE = 'restaunrants.create',
    RESTAURANTS_UPDATE = 'restaurants.update',
    RESTAURANTS_DELETE = 'restaurants.delete',
    RESTAURANTS_UPDATE_USERS = 'restaurants.update.users',
    
    // SHIPING ADDRESSES
    SHIPPING_ADDRESSES_ASIGNED = 'shipping.addresses.asigned',
    SHIPPING_ADDRESSES_LIST_ALL = 'shipping.addresses.list.all',
    SHIPPING_ADDRESSES_LIST = 'shipping.addresses.list',
    SHIPPING_ADDRESS_CREATE = 'shipping.address.create',
    SHIPPING_ADDRESS_UPDATE = 'shipping.address.update',
    SHIPPING_ADDRESS_DELETE = 'shipping.address.delete',


    // CATEGORY
    CATEGORY_CREATE = 'categories.create',
    CATEGORY_UPDATE = 'categories.update',
    CATEGORY_GET_ALL_COUNT = 'categories.get.all.count',
    CATEGORY_GET_ALL = 'categories.get.all',
    CATEGORY_GET_DETAIL = 'categories.get.detail',
    CATEGORY_DELETE = 'categories.delete',
    CATEGORIES_SUPPLIER_GET = 'categoires.supplier.get',

    // PRODUCTS
    PRODUCTS_CREATE = 'products.create',
    PRODUCTS_UPDATE = 'products.update',
    PRODUCTS_UPDATE_CATALOG = 'products.update.catalog',
    PRODUCTS_GET_ALL = 'products.get.all',
    PRODUCTS_DELETE = 'products.delete',
    PRODUCTS_DETAIL_ENTITY = 'products.detail',
    PRODUCTS_DETAIL_RESPONSE = 'products.detail.response',


    // ORDERS
    ORDERS_CREATED = 'orders.created',
    ORDERS_CREATE = 'orders.create',
    ORDERS_UPDATE_STATUS = 'orders.update.status',
    ORDERS_UPDATE_STATUS_RESPONSE = 'orders.update.status',
    ORDERS_UPDATE_PAYMENT = 'orders.update.payment',
    ORDERS_UPDATE_PAYMENT_RESPONSE = 'orders.update.payment.response',
    ORDERS_DELETE = 'orders.delete',
    ORDERS_GET_BY_COMPANY = 'orders.get.by.company',
    ORDERS_GET_DETAIL_RESPONSE = 'orders.get.detail.response',
    ORDERS_GET_DETAIL_ENTITY = 'orders.get.detail.entity',
    ORDERS_GET_QUERY = 'orders.get.query',
    ORDERS_GET_QUERY_RESPONSE = 'orders.get.query.response',
    ORDERS_GET_RESTAURANTS_CLIENT = 'orders.get.restaurants.client',
    ORDERS_GET_COUNTING_BY_COMPANY = 'orders.counting.by.company.ids',
    ORDERS_DISABLE_ORDERS_ARE_IN_INVOICE = 'orders.disable.orders.are.in.invoice',

    // INVOCIES
    INVOICES_CREATE = 'invoices.create',
    INVOICES_CREATED = 'invoices.created',
    INVOICES_UPDATE_ORDER_STATUS = 'invoices.update.orders.stauts',
    INVOICES_GET_ALL = 'invoices.get.all',
    INVOCIES_GET_DETAIL = 'invoices.get.detail',
    INVOICES_DELETE = 'invoices.delete',
    INVOICES_DELETED = 'invoices.deleted',
    INVOICE_UPDATE_PAID = 'invoice.update.paid',
    
    // CARTS
    CART_UPDATE = 'cart.update',
    CART_UPDATE_STATUS = 'cart.update.status',
    CART_GET_DETAIL = 'cart.get.detail',
    CART_CLEAR_PRODUCTS = 'cart.clear.products',
    CART_REMOVE_PRODUCT = 'cart.remove.product',
    CART_GET_COUNT_PRODUCTS = 'cart.get.count.products',

    // WORKERS
    WORKERS_FILE_ENCODE = 'workers.file.encode.logo',


    // MEMBERSHIP
    MEMBERSHIP_CREATE = 'membership.create',
    MEMBERSHIP_UPDATE = 'membership.update',
    MEMBERSHIP_GET_DETAIL = 'membership.get.detail',
    MEMBERSHIP_GET_ALL = 'membership.get.all',


    // MEMBERSHIP  RULE
    MEMBERSHIP_RULE_DETAIL ='membership.rule.detail',
    MEMBERSHIP_RULE_UPDATE ='membership.rule.update',


    // SEND EMAIL
    SEND_EMAIL_ORDER_RESTAURANT = 'mail.order.restaurant',
    SEND_EMAIL_INVOICE_RESTAURANT = 'mail.invoice.restaurant',


    // RATINGS
    RATINGS_CREATE = 'ratings.create',
    RATINGS_GET = 'ratings.get'

}