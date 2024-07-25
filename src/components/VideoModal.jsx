export default function  VideoModal  ({onClose,src})  {

  return (
      <div className="video-popup-overlay"     >
      <div className="video-popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <iframe
            title={src}       
            height={'100%'}
            width={'100%'}        
            allow={"autoplay"}       
            src={src}
        />
      </div>
      </div>
  )
}