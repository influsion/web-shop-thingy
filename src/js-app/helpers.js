function addScript(data) {
    var script = document.createElement('script');
    script.src = data.src;
    script.async = data.async || false;
    script.defer = data.defer || false;

    document.body.appendChild(script);
  }