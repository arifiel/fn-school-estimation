export default class UrlHelper {

    public static getImageSrc(imageName :string) : string {
        return VUE_APP_IMAGE_SERVER + imageName;
    }
    
}