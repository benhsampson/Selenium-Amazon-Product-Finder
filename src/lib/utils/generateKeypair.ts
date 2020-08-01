import crypto from 'crypto';
import fs from 'fs';

(function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('ed25519', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs12',
      format: 'pem',
    },
    privateKeyEncodings: {
      type: 'pkcs12',
      format: 'pem',
    },
  });

  fs.writeFileSync(__dirname + 'id_rsa_pub.pem', keyPair.publicKey.export());
  fs.writeFileSync(__dirname + 'id_rsa_priv.pem', keyPair.privateKey.export());
})();
