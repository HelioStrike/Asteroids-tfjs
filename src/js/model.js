var model = tf.sequential();
async function loadMobilenet() {
    mobilenet = await tf.loadModel(
        'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
  
    // Return a model that outputs an internal activation.
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    model = tf.model({inputs: mobilenet.inputs, outputs: layer.output});
};

// load and compile model
loadMobilenet().then(function(){

    model = tf.sequential(model);

    model.add(tf.layers.conv2d({
        inputShape: [224, 224, 3],
        kernelSize: 4,
        filters: 256,
        strides: 2,
        activation: 'relu',
        kernelInitializer: 'VarianceScaling'
    }));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({units: 100}));
    model.add(tf.layers.dense({units: 2, activation: 'softmax'}));

    model.compile({
        optimizer: optimizer,
        loss: 'meanSquaredError',
        metrics: ['accuracy'],
    });    
}).catch(function(err) {
    console.log(err);
});


const optimizer = tf.train.sgd(learning_rate);

//trains model and starts the game
async function trainModel() {
    var losses = [];
    var controls = tf.concat([left_control.reshape([1,224,224,3]), right_control.reshape([1,224,224,3])]);
    for (let i = 0; i < num_epochs; i++) {
        
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

    console.log(paper);
    window.gameStart();
}

train_btn.addEventListener("click", trainModel);
