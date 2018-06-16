var Resource = require('deployd/lib/resource'),
  util = require('util'),
  SparkPost = require('sparkpost');

function SparkPostMail(name, options) {
  Resource.apply(this, arguments);

}
util.inherits(SparkPostMail, Resource); //aplicar herencia al recurso
module.exports = SparkPostMail; //generar el recurso

SparkPostMail.prototype.clientGeneration = true; //habilitar al cliente para generar el recurso

//Se crea el panel de control con los campos para guardar en configuracion
SparkPostMail.basicDashboard = {
  settings: [{
    name: 'APIKey',
    type: 'text',
    description: 'API Key to acces sparkpost service'
  }, {
    name: 'sandbox',
    type: 'checkbox',
    description: 'Use sandbox feature?'
  }, {
    name: 'secret',
    type: 'text',
    description: 'secret key or password to make external requests, only for external calls, will be ignored for internal calls'
  }]
};

SparkPostMail.prototype.handle = function(ctx, next) {
  if (ctx.req && ctx.req.method !== 'POST') { // Si el metodo no es POST salimos
    return next();
  }

  //check for secretKey
  if (this.config.secret !== ctx.body.secret) {
    {
      return ctx.done({
        statusCode: 401,
        message: 'Unauthorized: Access is denied due to invalid credentials'
      });
    }
  }
 
  var client = new SparkPost(this.config.APIKey);
  var content;
  if (ctx.body.template_id) {
    content = {
      template_id: ctx.body.template_id
    };
  } else {
    content = {
      from: ctx.body.from,
      subject: ctx.body.subject,
      html: ctx.body.html
    }
  }
  
  client.transmissions.send({
    options: {
      sandbox: this.config.sandbox
    },
    content:content,
    recipients: [
      {address: ctx.body.to}
    ]
  })
  .then(data => {
    ctx.done(null, {
        success: ':) Woohoo! Mail sent!',
        data
      });
  })
  .catch(err => {
    return ctx.done(':( Whoops! Something went wrong' + err);
  });
}