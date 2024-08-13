export default function  VideoTryOn  ({onClose,src})  {
//document.getElementsByClassName('Close')[0].addEventListener('onClick', function (e) { console.log('clicked') }, false);
window.onmessage = function (event) {
    console.log(event.data)
    if (event.data === "closeIframe") {
        onClose();
    }
  };
  
    return (
       
  
  
  <div className="video-popup-overlay" onClick={onClose} >{src!==""&&
          <div className="video-popup-content" onClick={(e) => e.stopPropagation()}  style={{height:'70%',width:'70%',overflow:'hidden'}}
              >
                
          <iframe
              title={src}   
              width={'100%'}
              height={'100%'}        
              src={src}
              allow={"camera;microphone"}
          />

            <button className="close--button" onClick={onClose}>Close</button>
          </div>}
        </div>
  
  
    )
  }