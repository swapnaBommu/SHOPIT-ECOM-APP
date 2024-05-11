import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    //reducerPath/reducerName is the name of reducer it should pass in our store as reducer name
    reducerPath:"productApi",
    //in baseQuery we need to setup our baseurl in BE
    baseQuery:fetchBaseQuery({baseUrl: "/api/v1"}),
    // define our endpoints, here we are fetching data we should use query function
    //query: An endpoint definition that retrieves data
    tagTypes:["Product", "AdminProducts"],
    endpoints:(builder) => ({
        getProducts : builder.query({
            query: (params) =>({
                url: "/products",
                params:{
                    page : params?.page,
                    keyword : params?.keyword,
                    "price[gte]":params?.min,
                    "price[lte]":params?.max, 
                    category:params?.category,
                    "ratings[gte]":params?.ratings
                }
            }),
        }),
        getProductDetails : builder.query({
            query: (id) => `/products/${id}`,
            providesTags:["Product"]
        }), 
        submitReview: builder.mutation({
            query(body) {
              return {
                url: "/reviews",
                method: "POST",
                body,
              };
            },
            invalidatesTags:["Product"]
        }),
        canUserReview : builder.query({
            query: (productId) => `/can_review/?productId=${productId}`,
        }), 
        getAdminProducts : builder.query({
            query: () => `/admin/products`,
            providesTags:["AdminProducts"]
        }),
        createProduct: builder.mutation({
            query(body) {
              return {
                url: "/admin/products",
                method: "POST",
                body,
              };
            },
            invalidatesTags: ["AdminProducts"],
        }),
        updateProduct: builder.mutation({
            query({ id, body }) {
              return {
                url: `/admin/products/${id}`,
                method: "PUT",
                body,
              };
            },
            invalidatesTags: ["Product", "AdminProducts"],
        }),
    }),
});

export const {  useGetProductsQuery, 
    useGetProductDetailsQuery,
    useSubmitReviewMutation,
     useCanUserReviewQuery,
    useGetAdminProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation
 } = productApi;