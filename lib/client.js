import  SanityClient  from "@sanity/client";
import ImageUrlBuilder  from "@sanity/image-url";
export const client = SanityClient({
    projectId: "4j5xotmc",
    dataset: 'production',
    apiVersion: "2022-12-14",
    useCdn:true,
    token:
    "sk2tC1WXVxvHN9Qo6MoVeHcTUIpMo69XUdjq2du9TcJvcw9MGClB6zPCDoAOl7ecUJhqJ2VNDcqsowwdZVqVdCmGtESgMLaIEeJNSaluUVkjpJNruYrsxSYwpyj8FIhBExIUhVWIldFoBH49TZttAUbtGsYojIoiYIMPjS0769nx4LWrIJb7"
})
const builder =ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source)