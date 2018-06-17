function addLoadEvent(func) { // 为load事件添加响应函数
    var curonload = window.onload; // 保存当前的load事件响应函数
    if(typeof curonload != 'function') { // 如果当前的load事件响应函数的类型不是function的话，即没有绑定任何load事件响应函数的话，
        window.onload = func; // 则将func帮定为load事件的响应函数。
    } else { //否则,
        window.onload = function() { // 为load事件绑定新的响应函数，其定义如下：
            curonload(); //当前的load事件响应函数
            func(); // 新添加的load事件响应函数
        }
    }
}
function insertAfter(newElement, targetElement) { // 在目标元素(targetElement)之后插入新元素(newElement)
    var parent = targetElement.parentNode; // 获得目标元素的父节点
    if(parent.lastchild == targetElement) { // 如果目标元素是父节点的最后一个子节点的话，
        parent.appendChild(targetElement); // 直接调用内置的appendChild()函数，将新元素追加到最后。
    } else { // 否则
        parent.insertBefore(newElement, targetElement.nextSibling); // 调用内置的insertBefore()函数，将新元素插入到目标元素的下一个兄弟节点之前
    }
}
function preparePlaceholder() { // 准备图片显示区域
    if(!document.getElementById) return false;
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById('imagegallery')) return false; // 如果没有id为imagegallery的元素则返回false
    // 创建一个img元素
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id', 'placeholder');
    placeholder.setAttribute('src', 'images/placeholder.gif');
    placeholder.setAttribute('alt', 'my image gallery');
    // 创建一个p元素用于描述图片
    var description = document.createElement('p');
    description.setAttribute('id', 'description');
    // 为p元素创建文本子节点
    var desctext = document.createTextNode('Choose an image');
    description.appendChild(desctext);
    var gallery = document.getElementById('imagegallery'); // 获得id为imagegallery的元素
    insertAfter(description, gallery); // 将descrip插入到gallery后面
    insertAfter(placeholder, description); // 将placeholder插入到description后面
}

function prepareGallery() { // 准备gallery
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById('imagegallery')) return false;
    var gallery = document.getElementById('imagegallery'); // 获得id为imagegallery的元素
    var links = gallery.getElementsByTagName('a'); // 获得所有的链接
    for(var i = 0; i < links.length; ++i) { // 遍历每个链接
        links[i].onclick = function() { // 为每个链接的click事件绑定响应函数
            showPic(this); // 在placeholder中显示图片
            return false; // 返回false防止页面跳转
        }
    }
}
function showPic(whichpic) { // 显示图片
    var source = whichpic.getAttribute('href'); // 获得当前图片代表的链接(该链接指向当前图片放大后的图片)
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src', source); // 将placeholder的图片设置为当前图片放大后的图片
    var text = ''; // 创建描述文本并设置为空字符串
    if(whichpic.getAttribute('title')) { // 获得title属性
        text = whichpic.getAttribute('title');
    }
    var description = document.getElementById('description'); // 获得id为description的p元素
    if(3 == description.firstChild.nodeType) { // 如果第一个子节点为文本节点的话，则
        description.firstChild.nodeValue = text; // 将文本节点的值设置为text
    }
}
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);