import React from 'react';
import { Link } from 'react-router-dom';

export default function SocialIcon({ socialIconSetting }) {
  
  const currentPageUrl = encodeURIComponent(window.location.href);
  const shareLinks = {
    pinterest: `https://pinterest.com/pin/create/button/?url=${currentPageUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentPageUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentPageUrl}`,
    facebookLike: `https://www.facebook.com/plugins/like.php?href=${currentPageUrl}`
  };

  return (
    <>
      <div className="share2 social-share">
        {socialIconSetting.show_Pinterest_Share &&
        <Link to={shareLinks.pinterest} target="_blank" rel="noopener noreferrer" className='no-decoration'>
          <button className="button15 pinterest">
            <img className="social-icons1" alt="" src="/vector-32.svg" />
            <b className="save2">Save</b>
          </button>
        </Link>  
        }
        {socialIconSetting.show_Twitter_Share &&
        <Link to={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className='no-decoration'>
          <button className="button16 twitter">
            <img className="vector-icon12" alt="" src="/vector-41.svg" />
            <b className="post1">Post</b>
          </button>
        </Link>
        }
        {socialIconSetting.show_Facebook_Share &&
        <Link to={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className='no-decoration'>
          <button className="button15 facebook">
            <img className="vector-icon13" alt="" src="/vector-51.svg" />
            <b className="share3">Share</b>
          </button>
        </Link>
        }
        {socialIconSetting.show_Facebook_Like &&
        <Link to={shareLinks.facebookLike} target="_blank" rel="noopener noreferrer" className='no-decoration'>
          <button className="button16 likebtn">
            <img className="vector-icon14" alt="" src="/vector-6.svg" />
            <b className="like1">Like</b>
          </button>
        </Link>
        }
      </div>
    </>
  );
}