function fill(){
    var device_w=window.innerWidth;
    if(device_w>750)device_w=750;
    document.querySelector("html").style.fontSize=device_w/7.5+"px";
}
fill();
window.onresize=fill();