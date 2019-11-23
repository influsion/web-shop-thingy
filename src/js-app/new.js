function some(e){
    console.log('a', e.target);
}

some.prop = 1000;
function listener(func) {
    console.log(func.prop);
    const obj = {
        target: "it is target",
    };
    func(obj);
}

listener(some);
