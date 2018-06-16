# dpd-spakpost-mail
Simple integration of sparkpost mail with deployd

# Install 
`npm install dpd-sparkpotst-mail --save`

# Usage
Go to your dashboard and create SparkpostMail resource and enter the requested info
To send an email just call the post method of the mail resource you have created

```javascript
dpd.sparkpostmail.post({
      secret: '1234567890qwertyuiop',
      from: '"From Someone" <from@example.com>',
      to: 'to@example.com',
      subject: 'Hakuna Matata',
      html: '<h2>Aloha</h2><br>Don't worry, be happy
    }, function(result, error) {
      console.log(error);
      console.log(result);
    });
```
Change *sparkpostmail* with your resource name

## Templates integration coming for the next release, it's already coded, just need a few tweaks, feel free to modify it to get it work with templates.

# Support
For any help post an issue or write to gustavo@chimera.digital
