import React from 'react';
//import { chevronLeft, chevronRight } from './SVG';
export default function SocialIcon({socialIconSetting}) {
  return ( 
    <>        
       
          <div className="share2">
          {socialIconSetting.show_Pinterest_Share &&
                        <button className="button15">
                          <img className="social-icons1" alt="" src="/vector-32.svg" />
                          <b className="save2">Save</b>
                        </button>
} {socialIconSetting.show_Twitter_Share &&
                        <button className="button16">
                          <img className="vector-icon12" alt="" src="/vector-41.svg" />
                          <b className="post1">Post</b>
                        </button>
}{socialIconSetting.show_Facebook_Share &&
                        <button className="button15">
                          <img className="vector-icon13" alt="" src="/vector-51.svg" />
                          <b className="share3">Share</b>
                        </button>
} {socialIconSetting.show_Facebook_Like &&
                        <button className="button16">
                          <img className="vector-icon14" alt="" src="/vector-6.svg" />
                          <b className="like1">Like</b>
                        </button>
}
                      </div>
    </>
  );
}
