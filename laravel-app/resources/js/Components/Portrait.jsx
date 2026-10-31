export default function Portrait(){
 return <div className="portrait-frame">
  <div className="portrait-outline" aria-hidden="true"/>
  <img src="/images/profile.jpg" alt="Portrait of Justin Jay Vitales" width="1024" height="1536" className="portrait-photo" fetchPriority="high"/>
 </div>;
}
