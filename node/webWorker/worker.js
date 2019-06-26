onmessage = function (e) {
    let param = null;
    param = e.data;
    console.log(e.data,'param');

    var i = 0;
    while(i< param){
        i++;
    }

    self.postMessage('click');
    self.close();
};