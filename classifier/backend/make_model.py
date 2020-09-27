import tensorflow as tf
model=tf.keras.applications.VGG19(weights="imagenet")
model.save("vgg19.h5")
