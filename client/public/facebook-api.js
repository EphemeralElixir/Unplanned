(function fbSdk(d, s, id) {
  const js = d.createElement(s); js.id = id;
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
