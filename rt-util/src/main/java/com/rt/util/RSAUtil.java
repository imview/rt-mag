package com.rt.util;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.*;
import javax.crypto.spec.DESedeKeySpec;
import java.io.*;
import java.security.*;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Enumeration;
import java.util.UUID;

/**
 * 加密解密工具类
 */
public class RSAUtil {

	protected static final int AES_LENGTH = 128;

	private static final String DEFAULT_CHARSET = "UTF-8";

    private static Logger log = LoggerFactory.getLogger(RSAUtil.class);

	private static final String RSA_ALGORITHM = "RSA";

    public static final String SIGNATURE_ALGORITHM = "SHA1withRSA";

    // 从正式中获取私钥,keystoreType默认为key[可选参数]
    public static String getPrivateKeyStringByKeyStore(String keystorePath, String keystorePwd, String keystoreType) {
        KeyStore keyStore = getKeyStore(keystorePath, keystorePwd, keystoreType);
        if (keyStore == null) {
            System.out.println("获取密钥库对象失败！");
            return null;
        }
        String alias = getAlias(keyStore);
        if (alias == null || "".equals(alias)) {
            alias = getAlias(keyStore);
        }

        try {
            Key key = keyStore.getKey(alias, keystorePwd.toCharArray());
            return Base64.encodeBase64String(key.getEncoded());

        } catch (UnrecoverableKeyException e) {
            e.printStackTrace();
        } catch (KeyStoreException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    // 从正式中获取公钥
    public static String getPublicKeyStringByFile(String certificatePath) {
        X509Certificate x509Certificate = getX509Certificate(certificatePath);
        return Base64.encodeBase64String(x509Certificate.getPublicKey().getEncoded());
    }

	/**
     * 加载密钥(不兼容ios)
     * 
     * @param in
     *            密钥输入流
     * @return Key 返回密钥对象
     * @throws IOException
     */
    public static Key loadKey(InputStream in) throws IOException {
		ObjectInputStream ois = null;
        try {
			ois = new ObjectInputStream(in);
			Key key = (Key) ois.readObject();
			return key;
        } catch (ClassNotFoundException e) {
			log.error("class of key not found", e);
        } finally {
            if (ois != null) {
				ois.close();
			}
		}
		return null;
	}

    /**
     * 从字符串中加载公钥
     * 
     * @param publicKeyStr
     *            公钥数据字符串
     * @throws Exception
     *             加载公钥时产生的异常
     */
    public static Key loadPublicKey(String publicKeyStr)
            throws NoSuchAlgorithmException, InvalidKeySpecException, NullPointerException {
        try {
            byte[] buffer = Base64.decodeBase64(publicKeyStr);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(buffer);
            return keyFactory.generatePublic(keySpec);
        } catch (NoSuchAlgorithmException e) {
            log.error("not support algorithm of secret[rsa]", e);
            throw e;
        } catch (InvalidKeySpecException e) {
            log.error("invalid key", e);
            throw e;
        } catch (NullPointerException e) {
            log.error("", e);
            throw e;
        }
    }

    /**
     * 从字符串中加载私钥
     * 
     * @param privateKeyStr
     *            公钥数据字符串
     * @throws Exception
     *             加载公钥时产生的异常
     */
    public static Key loadPrivateKey(String privateKeyStr)
            throws NoSuchAlgorithmException, InvalidKeySpecException, NullPointerException {
        try {
            byte[] buffer = Base64.decodeBase64(privateKeyStr);
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(buffer);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return keyFactory.generatePrivate(keySpec);
        } catch (NoSuchAlgorithmException e) {
            log.error("not support algorithm of secret[rsa]", e);
            throw e;
        } catch (InvalidKeySpecException e) {
            log.error("invalid key", e);
            throw e;
        } catch (NullPointerException e) {
            log.error("nullPointer", e);
            throw e;
        }
    }

    public static String getKeyString(String filePath) throws IOException, NullPointerException, FileNotFoundException {
        InputStream inputStream = getInputStream(filePath);
        return loadKeyString(inputStream);
    }
	
    /**
     * 输出密钥(不兼容ios)
     * 
     * @param key
     *            密钥
     * @param os
     *            输入
     * @throws IOException
     */
    public static void outPutKey(Key key, OutputStream os) throws IOException {
		ObjectOutputStream oos = null;
        try {
			oos = new ObjectOutputStream(os);
			oos.writeObject(key);
        } finally {
            if (oos != null) {
				oos.close();
			}
		}
	}

	/**
     * 根据RSA算法生成密钥对
     * 
     * @return KeyPair 密钥对
     * @throws NoSuchAlgorithmException
     * @throws NoSuchPaddingException
     */
    public static KeyPair generator() throws NoSuchAlgorithmException, NoSuchPaddingException {
		KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(RSA_ALGORITHM);
		return keyPairGenerator.generateKeyPair();
	}

	/**
     * RSA加密
     * 
     * @param key
     *            秘钥
     * @param src
     *            源数据
     * @return byte[] 加密后的数据
     * @throws InvalidKeyException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     * @throws NoSuchPaddingException
     * @throws NoSuchAlgorithmException
     */
    public static byte[] encryptWithRSA(Key key, byte[] src) throws InvalidKeyException, IllegalBlockSizeException,
            BadPaddingException, NoSuchPaddingException, NoSuchAlgorithmException {
        if (src == null || src.length == 0) {
			throw new IllegalArgumentException("报文为空");
		}
        try {
			Cipher ciper = Cipher.getInstance(RSA_ALGORITHM);
			ciper.init(Cipher.ENCRYPT_MODE, key);
			return ciper.doFinal(src);
        } catch (NoSuchAlgorithmException e) {
			log.error("not support algorithm of secret[rsa]", e);
			throw e;
        } catch (NoSuchPaddingException e) {
			log.error("no such padding", e);
			throw e;
        } catch (InvalidKeyException e) {
			log.error("invalid key", e);
			throw e;
        } catch (IllegalBlockSizeException e) {
			log.error("illegal block size", e);
			throw e;
        } catch (BadPaddingException e) {
			log.error("bad padding", e);
			throw e;
		}
	}

	/**
     * RSA解密
     * 
     * @param key
     *            私钥
     * @param src
     *            加密后的源数据
     * @return byte[] 解密后的数据
     * @throws InvalidKeyException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     * @throws NoSuchAlgorithmException
     * @throws NoSuchPaddingException
     */
    public static byte[] decryptWithRSA(Key key, byte[] src) throws InvalidKeyException, IllegalBlockSizeException,
            BadPaddingException, NoSuchAlgorithmException, NoSuchPaddingException {
        try {
            Cipher cipher = Cipher.getInstance(RSA_ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key);
            return cipher.doFinal(src);
        } catch (NoSuchAlgorithmException e) {
            log.error("not support algorithm of secret[rsa]", e);
			throw e;
        } catch (NoSuchPaddingException e) {
			log.error("no such padding", e);
			throw e;
        } catch (InvalidKeyException e) {
			log.error("invalid key", e);
			throw e;
        } catch (IllegalBlockSizeException e) {
			log.error("illegal block size", e);
			throw e;
        } catch (BadPaddingException e) {
			log.error("bad padding", e);
			throw e;
		}
    }

    /**
     * 3DES加密
     * 
     * @param src
     *            需要加密的内容
     * @param password
     *            加密密码
     * @return byte[] 加密后的数据
     * @throws UnsupportedEncodingException
     * @throws NoSuchAlgorithmException
     * @throws NoSuchPaddingException
     * @throws InvalidKeyException
     * @throws InvalidKeySpecException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     */
    public static byte[] encryptWith3DES(byte[] src, String password)
            throws UnsupportedEncodingException, InvalidKeyException, InvalidKeySpecException, NoSuchAlgorithmException,
            NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
        try {
            DESedeKeySpec dks = new DESedeKeySpec(password.getBytes(DEFAULT_CHARSET));
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
			SecretKey securekey = keyFactory.generateSecret(dks);

			Cipher cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, securekey);
			return cipher.doFinal(src);
        } catch (UnsupportedEncodingException e) {
			log.error("unsupported Encoding");
			throw e;
        } catch (InvalidKeySpecException e) {
			log.error("invalid key spec", e);
			throw e;
        } catch (InvalidKeyException e) {
			log.error("invalid key", e);
			throw e;
        } catch (NoSuchAlgorithmException e) {
			log.error("not support algorithm of secret[3des]", e);
			throw e;
        } catch (NoSuchPaddingException e) {
			log.error("no such padding", e);
			throw e;
        } catch (IllegalBlockSizeException e) {
			log.error("illegal block size", e);
			throw e;
        } catch (BadPaddingException e) {
			log.error("bad padding", e);
			throw e;
		}
	}

	/**
	 * 3DES解密
	 * 
	 * @param content
	 *            待解密内容
	 * @param password
	 *            解密密钥
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws NoSuchPaddingException
	 * @throws InvalidKeyException
	 * @throws IllegalBlockSizeException
	 * @throws BadPaddingException
	 * @throws UnsupportedEncodingException
	 * @throws InvalidKeySpecException
	 */
    public static byte[] decryptWith3DES(byte[] content, String password)
            throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException,
            BadPaddingException, UnsupportedEncodingException, InvalidKeySpecException {
        try {
			DESedeKeySpec dks = new DESedeKeySpec(password.getBytes("UTF-8"));
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DESede");
			SecretKey securekey = keyFactory.generateSecret(dks);
			Cipher cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, securekey);
			return cipher.doFinal(content);
        } catch (NoSuchAlgorithmException e) {
			log.error("not support algorithm of secret[3des]", e);
			throw e;
        } catch (NoSuchPaddingException e) {
			log.error("no such padding", e);
			throw e;
        } catch (InvalidKeyException e) {
			log.error("invalid key", e);
			throw e;
        } catch (IllegalBlockSizeException e) {
			log.error("illegal block size", e);
			throw e;
        } catch (BadPaddingException e) {
			log.error("bad padding", e);
			throw e;
        } catch (UnsupportedEncodingException e) {
			log.error("unsupported encoding", e);
			throw e;
        } catch (InvalidKeySpecException e) {
			log.error("invalid key spec", e);
			throw e;
		}
	}

    /**
     * Base64编码
     * 
     * @param src
     * @return
     */
    public static String encode(byte[] src) {
        return Base64.encodeBase64String(src);
    }

    /**
     * Base64解码
     * 
     * @param src
     * @return
     */
    public static byte[] decode(String src) {
        return Base64.decodeBase64(src);
    }

    /**
     * 用私钥对信息生成数字签名
     * 
     * @param data
     *            加密数据
     * @param privateKey
     *            私钥
     * 
     * @return
     * @throws Exception
     */
    public static String sign(byte[] data, String privateKey) throws Exception {
        // 解密由base64编码的私钥
        byte[] keyBytes = Base64.decodeBase64(privateKey.getBytes("UTF-8"));

        // 构造PKCS8EncodedKeySpec对象
        PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(keyBytes);

        // KEY_ALGORITHM 指定的加密算法
        KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);

        // 取私钥匙对象
        PrivateKey priKey = keyFactory.generatePrivate(pkcs8KeySpec);

        // 用私钥对信息生成数字签名
        Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
        signature.initSign(priKey);
        signature.update(data);

        return new String(Base64Util.encode(signature.sign()));
    }

    /**
     * 校验数字签名
     * 
     * @param data
     *            加密数据
     * @param privateKey
     *            私钥
     * @param sign
     *            数字签名
     * 
     * @return 校验成功返回true 失败返回false
     * @throws Exception
     * 
     */
    public static boolean verify(byte[] data, String privateKey, String sign) throws Exception {

        // 解密由base64编码的公钥
        byte[] keyBytes = Base64.decodeBase64(privateKey.getBytes("Utf-8"));

        // 构造X509EncodedKeySpec对象
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);

        // KEY_ALGORITHM 指定的加密算法
        KeyFactory keyFactory = KeyFactory.getInstance(RSA_ALGORITHM);

        // 取公钥匙对象
        PublicKey pubKey = keyFactory.generatePublic(keySpec);

        Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
        signature.initVerify(pubKey);
        signature.update(data);

        // 验证签名是否正常
        return signature.verify(Base64Util.decode(sign.getBytes("UTF-8")));
    }

    /**
     * 效验3DES密钥,只能为24字符密钥且密钥内容不能全部相同
     * 
     * @param decodeKey
     * @return
     */
    public static boolean check3desKey(String decodeKey) {
        try {
            if (StringUtils.isNotEmpty(decodeKey)) {
                if (decodeKey.length() < 24) {
                    return true;
                } else if (StringUtils.countMatches(decodeKey, StringUtils.substring(decodeKey, 0, 1)) >= decodeKey
                        .length()) {
                    return true;
                }
            }
        } catch (Exception e) {
            log.error("check3desKey exception", e);

            return true;
        }

        return false;
    }

    /**
     * 构造3Des加密Key
     * 
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String generate3Deskey() throws UnsupportedEncodingException {
        String keyStr = UUID.randomUUID().toString();
        keyStr = keyStr.replace("-", "");
        String result = new String(build3DesKey(keyStr));
        return result;
    }

    public static byte[] build3DesKey(String keyStr) throws UnsupportedEncodingException {
        byte[] key = new byte[24];
        byte[] temp = keyStr.getBytes("UTF-8");

        if (key.length > temp.length) {
            System.arraycopy(temp, 0, key, 0, temp.length);
        } else {
            System.arraycopy(temp, 0, key, 0, key.length);
        }
        return key;
    }

    /**
     * 找到路径下的密钥库文件，获取密钥库对象
     * 
     * @param keystorePath
     *            密钥库文件路径
     * @param keystorePwd
     *            密钥库密码
     * @param keystoreType
     *            密钥库类型 无设置默认JKS
     * @return
     */
    private static KeyStore getKeyStore(String keystorePath, String keystorePwd, String keystoreType) {

        System.out.println("密钥库文件路径：" + keystorePath);

        if (keystoreType == null || "".equals(keystoreType)) {
            keystoreType = KeyStore.getDefaultType();
        }

        System.out.println("创建密钥库对象使用的密钥库类型：" + keystoreType);

        FileInputStream stream = null;
        KeyStore keyStore = null;
        try {
            stream = new FileInputStream(keystorePath);
            keyStore = KeyStore.getInstance(keystoreType);
            keyStore.load(stream, keystorePwd.toCharArray());

            System.out.println("读取文件密钥库对象成功！");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (KeyStoreException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (CertificateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (stream != null) {
                try {
                    stream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                stream = null;
            }
        }

        return keyStore;
    }

    /**
     * 查找密钥库中私钥别名，找到名称就停止查找
     * 
     * @param keyStore
     *            密钥库
     * @return
     */
    private static String getAlias(KeyStore keyStore) {
        String alias = null;
        try {
            Enumeration<String> aliases = keyStore.aliases();
            while (aliases.hasMoreElements()) {
                String element = aliases.nextElement();
                if (keyStore.isKeyEntry(element)) {
                    alias = element;
                    break;
                }
            }
        } catch (KeyStoreException e) {
            e.printStackTrace();
        }

        return alias;
    }

    /**
     * 找到路径下的证书文件，获取证书对象
     * 
     * @param certificatePath
     *            证书文件路径
     * @return
     */
    private static X509Certificate getX509Certificate(String certificatePath) {

        System.out.println("证书文件路径：" + certificatePath);

        FileInputStream stream = null;
        X509Certificate x509Certificate = null;
        try {
            stream = new FileInputStream(certificatePath);
            CertificateFactory certificateFactory = CertificateFactory.getInstance("x.509");// 1.6版本只支持x.509标准证书
            x509Certificate = (X509Certificate) certificateFactory.generateCertificate(stream);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (CertificateException e) {
            e.printStackTrace();
        } finally {
            if (stream != null) {
                try {
                    stream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                stream = null;
            }
        }

        return x509Certificate;
    }

    /**
     * 从输入流中加载公钥
     * 
     * @param is
     *            公钥输入流
     * @throws Exception
     *             加载公钥时产生的异常
     */
    private static String loadKeyString(InputStream is) throws IOException, NullPointerException {
        BufferedReader br = null;
        try {
            br = new BufferedReader(new InputStreamReader(is));
            String readLine = null;
            StringBuilder sb = new StringBuilder();
            while ((readLine = br.readLine()) != null) {
                if (readLine.charAt(0) == '-') {
                    continue;
                } else {
                    sb.append(readLine);
                    sb.append('\r');
                }
            }
            return sb.toString();
        } catch (IOException e) {
            log.error("fail to read stream", e);
            throw e;
        } catch (NullPointerException e) {
            log.error("nothing input", e);
            throw e;
        } finally {
            if (br != null) {
                br.close();
            }
        }
    }

    /**
     * 获取密钥文件输入流
     * 
     * @param filePath
     *            密钥文件完整路径
     * @return java.io.InputStream
     * @throws FileNotFoundException
     */
    private static InputStream getInputStream(String filePath) throws FileNotFoundException {
        if (StringUtils.isNotEmpty(filePath)) {
            return new FileInputStream(filePath);
        }

        return null;
    }

    public static void main(String arr[]) {

        try {

            /*
             * String privateCertPath =
             * "E:\\java\\cert\\ucsmy.linux\\ucsmy.com.key"; String
             * publicCertPath = "E:\\java\\cert\\ucsmy.linux\\ucsmy.com.crt";
             * 
             * String privateCertPath =
             * "E:\\Project\\CmbInfrastructure\\javademo\\demo-api\\ucscert\\COTASC_U10001.pfx";
             * String publicCertPath =
             * "E:\\Project\\CmbInfrastructure\\javademo\\demo-api\\ucscert\\UMTASC_U10001.cer";
             */
            // 通过代码从keytool工具中获取的秘钥对数据
            /*
             * String privateCertPath =
             * "E:\\java\\cert\\test\\test_private.pem"; String publicCertPath =
             * "E:\\java\\cert\\test\\test_public.pem";
             */
            // java组发的证书文件
            String privateCertPath = "E:\\java\\cert\\test\\rsa_private.pem";
            String publicCertPath = "E:\\java\\cert\\test\\rsa_public_key.pem";
            String privateKey = RSAUtil.getKeyString(privateCertPath);// (new
                                                                          // FileInputStream(privateCertPath));
            String publicKey = RSAUtil.getKeyString(publicCertPath);// RSAUtil.loadKeyString(new
                                                                        // FileInputStream(publicCertPath));

            System.out.println("publicKey:" + publicKey);
            System.out.println("privateKey:" + privateKey);
            // 公钥加密-- 私钥解密
            /*
             * String inputStr = "abc私钥解"; byte[] data = inputStr.getBytes();
             * byte[] encodedData = RSAUtil.encryptByPublicKey(data,publicKey);
             * byte[] decodedData = RSAUtil.decryptByPrivateKey(encodedData,
             * privateKey); String outputStr = new String(decodedData);
             * System.err.println("加密前: " + inputStr + "\n\r" + "解密后: " +
             * outputStr);
             */
            System.out.println("签名方法验证");

            byte[] encodedData = "dfasd".getBytes();
            String signData = sign(encodedData, privateKey);
            System.out.println("signData:" + signData);
            boolean isVerify = verify(encodedData, publicKey, signData);
            System.out.println("验签结果：" + isVerify);

            /*
             * System.out.println("开始加密");
             * 
             * 
             * String privateKeyStr=EncryptUtil.getPrivateKeyStringByKeyStore(
             * "E:\\java\\cert\\test\\TestPrivate.jks", "12345678" ,null);
             * String publicKeyStr=EncryptUtil.getPublicKeyStringByFile(
             * "E:\\java\\cert\\test\\TestPublic.cer");
             * System.out.println("privateKey:"+privateKeyStr);
             * System.out.println("publicKey:"+publicKeyStr); Key privateKey
             * =loadPrivateKey(privateKeyStr); Key publicKey
             * =EncryptUtil.loadPublicKey(publicKeyStr); byte[] a =
             * EncryptUtil.encryptWithRSA(publicKey,
             * "测试数据".getBytes());//("测试数据".getBytes(), privateKeyStr);
             * System.out.println("开始解密");
             * 
             * byte[] b =EncryptUtil.decryptWithRSA(privateKey, a);
             * System.out.println("结束解密"+new String(b));
             * 
             * 
             * String signData= sign(a,privateKeyStr);
             * System.out.println("signData:"+signData); boolean
             * isVerify=verify(a,publicKeyStr,signData);
             * System.out.println("验签结果："+isVerify);
             * 
             * 
             * //3DES加解密 System.out.println("3DES加解密"); String password
             * =EncryptUtil.generate3Deskey(); byte [] encryptStr=
             * EncryptUtil.encryptWith3DES("dede菜单".getBytes(), password); byte
             * [] decrptStr = EncryptUtil.decryptWith3DES(encryptStr, password);
             * System.out.println(new String (decrptStr));
             */
        } catch (Exception e) {
            e.printStackTrace();
            // TODO: handle exception
        }

    }

}
