#!/usr/bin/python

try:
    import tensorflow as tf
    from tensorflow import keras
    from tensorflow.keras.preprocessing import image
    from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
    import numpy as np
    import logging
    tf.get_logger().setLevel(logging.ERROR)
    
except:
    print(-1)

def output(path):
    try:
        model=keras.models.load_model("vgg19.h5")
        new_image=image.load_img(path,target_size=(224,224))
        img_array=image.img_to_array(new_image)
        img_array=np.expand_dims(img_array,axis=0)
        img_array = preprocess_input(img_array)
        result=model.predict(img_array)
        print(decode_predictions(result, top=1)[0][0][1],end="")
    except:
        print(-1)
      
if __name__=="__main__":
    file_name=input()
    path="uploads\\" + file_name
    output(path)
    
