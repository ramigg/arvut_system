var script = document.createElement('script');
				ANDIjsPathTemp = document.getElementById('andipath').src;
				TUAjsPath = ANDIjsPathTemp.replace('/andifn1.js', '/andi2fn1.js');
				script.src = TUAjsPath;
				script.type = 'text/javascript';
				script.id = 'andi2path';
				var head = document.getElementsByTagName('head')[0];
				head.appendChild(script);