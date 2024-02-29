// 节流
const throttle = (fun, delay) => {
    let timer = null
    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                fun()
                timer = null
            }, delay)
        }

    }
}

// 去抖
const debounce = (fun, delay) => {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fun()
            timer = null;
        }, delay)
    }
}

// 深拷贝
function DeepClone(data) {
    const newData = Array.isArray(data) ? [] : {}
    for (let key in data) {
        if (data[key] && typeof data[key] === 'object') {
            newData[key] = DeepClone(newData[key])
        } else {
            newData[key] = data[key]
        }
    }
    return newData
}

// 实现useRequest
function useRequest(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(url)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
}

// 排序
const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp
}
// 1.冒泡排序
// 思想：0和1，1和2比较,最大的放到最后，在从头开始比较剩下的数
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
            }
        }
    }
    return arr;
}

// 2.选择排序
// 思想：假设当前是最小值，从后一个开始比较，谁小minIndex就给谁
function selectSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        if (i !== minIndex) {
            swap(arr, i, minIndex)
        }

    }
    return arr
}

// 3.插入排序
// 思想：拿当前的和前面的依次比较，大的就往后挪一个
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let preIndex = i - 1
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex--
        }
        arr[preIndex + 1] = current
    }
}

// 自己实现combineReducers

const conbineReducers = (reducers) => {
    return (state, action) => {
        const newState = {}
        Object.keys(reducers).forEach(key => {
            newState[key] = reducers[key](state[key], action)
        })
        return newState
    }
}

// 寄生组合继承

function geSubtPrototype(SuperType) {
    function Func() { }
    Func.prototype = SuperType.prototype;
    return new Func();
}


function SuperType(property) {
    this.property = property;
}


SuperType.prototype.getSuperValue = function () {
    return this.property;
}


function SubType(property, subProperty) {
    SuperType.call(this, property);
    this.subProperty = subProperty;
}


SubType.prototype = geSubtPrototype(SuperType);


SubType.prototype.getSubValue = function () {
    return this.subProperty;
}

// intanceof 操作符的实现原理及实现
function myInstanceof(left, right) {
    // 获取对象的原型
    let proto = Object.getPrototypeOf(left)
    // 获取构造函数的 prototype 对象
    let prototype = right.prototype;

    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while (true) {
        if (!proto) return false;
        if (proto === prototype) return true;
        // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
        proto = Object.getPrototypeOf(proto);
    }
}

// 实现call
Function.prototype.myCall = function () {
    const args = [...arguments]
    let newObj = args.shift() ?? window
    newObj = Object(newObj)
    const uniqueKey = Symbol()
    newObj.__proto__[uniqueKey] = this
    const result = newObj[uniqueKey](...args)
    delete newObj.__proto__[uniqueKey]
    return result
}

// 实现apply 第一个参数是指向的新对象，第二个参数是数组里面放着函数的参数
Function.prototype.myApply = function () {
    const args = arguments[1]
    let newObj = arguments[0] ?? window
    newObj = Object(newObj)
    const uniqueKey = Symbol()
    newObj.__proto__[uniqueKey] = this
    const reuslt = newObj[uniqueKey](...args)
    delete newObj.__proto__[uniqueKey]
    return reuslt
}

// 4.bind 不会立即调用
Function.prototype.myBind = function () {
    const args = [...arguments]
    let newBindObj = args.shift() || window
    let thisFunc = this
    return function () {
        thisFunc.apply(newBindObj, [...args])
    }
}

async function async1() {
    console.log('111 start')
    await async2()
    console.log('1111 end')
}

async function async2() {
    console.log('2 start')
}
console.log('start')

setTimeout(() => {
    console.log('sssss')
},0)

 async1()

 new Promise((resolve) => {
    console.log('p1')
    resolve();
 }).then(() => {
    console.log('p2')
 })
 console.log('end')









