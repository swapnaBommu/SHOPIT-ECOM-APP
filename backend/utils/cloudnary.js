import cloudnary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({path: 'backend/config/config.env'})

cloudnary.config({
    cloud_name : process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_CLOUD_API_KEY,
    api_secret:process.env.CLOUDNARY_CLOUD_API_SECRET,
});

export const upload_file = (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudnary.uploader.upload(
            file,
            (result) => {
                resolve({
                    public_id : result.public_id,
                    url:result.url
                });
            },
            {
                resource_type : "auto", //what type of resource we are uploading
                folder,
            }
        );
    });
};

export const delete_file = async (file) =>{
    const res = await cloudnary.uploader.destroy(file);

    if(res?.result === "ok"){
        return true;
    }
};

