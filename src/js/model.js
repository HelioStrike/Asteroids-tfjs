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
model.add(tf.layers.dense({units: 1, activation: 'softmax'}));

/*
async function loadMobilenet() {
    const mobilenet = await tf.loadModel(
        'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
  
    // Return a model that outputs an internal activation.
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
};

model = await loadMobilenet();
*/

const LEARNING_RATE = 0.001;
const optimizer = tf.train.sgd(LEARNING_RATE);

model.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError',
    metrics: ['accuracy'],
});

async function trainModel() {
    var losses = [];
    var controls = tf.concat([left_control.reshape([1,224,224,3]), right_control.reshape([1,224,224,3])]);
    for (let i = 0; i < EPOCHS; i++) {
        
        const history = await model.fit(
            controls,
            tf.tensor([[1,0],[0,1]]),
            {
                batchSize: 2,
                epochs: 1
            }
        );
      
        const loss = history.history.loss[0];
        loss_text.textContent = "Loss: " + loss;
        losses.push(loss);
    }
    console.log(losses);

    window.setInterval(function(){
        var pix = tf.reshape(tf.fromPixels(video), [1,224,224,3]);
        var ans = model.predict(pix).dataSync();
        console.log(ans);
        if(ans[0] > ans[1]) {
            left_canvas.className = "currmove";
            right_canvas.className = "";
        } else {
            left_canvas.className = "";
            right_canvas.className = "currmove";
        }
    }, 1000);
}

train_btn.addEventListener("click", trainModel);

console.log(model.predict(tf.randomNormal([1,224,224,3])));
