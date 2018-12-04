const model = tf.sequential();
model.add(tf.layers.conv2d({
    inputShape: [224,224,1],
    kernelSize: 5,
    filters: 8,
    strides: 2,
    activation: 'relu',
    kernelInitializer: 'VarianceScaling'
}));


model.add(tf.layers.maxPooling2d({
    poolSize: [2, 2],
    strides: [2, 2]
}));

model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'VarianceScaling'
}));

model.add(tf.layers.maxPooling2d({
poolSize: [2, 2],
strides: [2, 2]
}));