const model = tf.sequential();
model.add(tf.layers.conv2d({
    inputShape: [224, 224, 3],
    kernelSize: 7,
    filters: 6,
    strides: 4,
    activation: 'relu',
    kernelInitializer: 'VarianceScaling'
}));

model.add(tf.layers.maxPooling2d({
    poolSize: [2, 2],
    strides: [2, 2]
}));

model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 6,
    strides: 2,
    activation: 'relu',
    kernelInitializer: 'VarianceScaling'
}));

model.add(tf.layers.maxPooling2d({
    poolSize: [2, 2],
    strides: [2, 2]
}));


model.add(tf.layers.flatten());
model.add(tf.layers.dense({units: 64}));
model.add(tf.layers.dense({units: 2}));

const LEARNING_RATE = 0.15;
const optimizer = tf.train.sgd(LEARNING_RATE);

model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
});

function trainModel() {
        
}

console.log(model.predict(tf.randomNormal([1 , 224, 224, 3])));
