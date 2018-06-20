# dpd-spakpost-mail
Simple integration of sparkpost mail with deployd

# Install 
`npm i dpd-sparkpost-mail --save`

# Usage
Go to your dashboard and create SparkpostMail resource and enter the requested info
To send an email just call the post method of the mail resource you have created

```javascript
dpd.sparkpostmail.post({
      secret: 'sdfa7sda9f76s9af6',
      from: '"From Someone" <from@example.com>',
      to: 'to@example.com',
      subject: 'Hakuna Matata',
      html: '<h2>Aloha</h2><br>Don\'t worry, be happy'
      delay_minutes: 30,
      delay_hours: 1
    }, function(result, error) {
      console.log(error);
      console.log(result);
    });
```

*delay_minutes* and *delay_hours* are optional, the defautl value for this is *0*. Set that values only if you want do schedule/delay the email delivery.

## Using Templates
You can specify a template id and substitution data instead content
```javascript
dpd.sparkpostmail.post({
      to: 'to@example.com',
      template_id: 'my-template-id',
      substitution_data:{
        key:value,
        key2:value2,
      }
    }, function(result, error) {
      console.log(error);
      console.log(result);
    });
```
*substitution_data* field is optional


Change *sparkpostmail* with your resource name

## Templates integration coming for the next release, it's already coded, just need a few tweaks, feel free to modify it to get it work with templates.

# Support
For any help post an issue or write to gustavo@chimera.digital
