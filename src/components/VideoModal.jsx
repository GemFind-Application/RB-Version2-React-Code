export default function  VideoModal  ({onClose,src})  {

  return (
     


<div className="video-popup-overlay" onClick={onClose}>
        <div className="video-popup-content" onClick={(e) => e.stopPropagation()}>
        <iframe
            title={src}       
            height={'100%'}
            width={'100%'}        
            allow={"autoplay"}       
            src={src}
        />
          <button className="close--button" onClick={onClose}>Close</button>
        </div>
      </div>


  )
}