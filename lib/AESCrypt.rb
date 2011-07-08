require 'openssl'
require 'base64'

module AESCrypt

  def AESCrypt.bytes_to_hex(str)
    str.unpack('C*').each{ |i| printf "%d,", i}
    print "\n"
    str.unpack('C*').map{ |i| i.to_s(16).rjust(2,'0') }.each{ |i| printf "%s,", i}
    print "\n"
    return str.unpack('C*').map{ |i| i.to_s(16).rjust(2,'0') } * ''
  end
  
  def AESCrypt.hex_to_bytes(str)
    str.scan(/../).each{ |i| printf "%s,", i}
    print "\n"
    str.scan(/../).map{|c| c.to_i(16) }.each{ |i| printf "%d,", i}
    print "\n"
    return str.scan(/../).map{|c| c.to_i(16) }.pack('C*')
  end

  def AESCrypt.decrypt(encrypted_data, key, iv, cipher_type)
    aes = OpenSSL::Cipher::Cipher.new(cipher_type)
    aes.decrypt
    #aes.padding = 0
    aes.key = hex_to_bytes(key)
    aes.iv = hex_to_bytes(iv) if iv != nil
    aes.update(encrypted_data) + aes.final  
  end
  
  def AESCrypt.encrypt(data, key, iv, cipher_type)
    #print key+"\n"
    #print bytes_to_hex(hex_to_bytes(key))
    aes = OpenSSL::Cipher::Cipher.new(cipher_type)
    aes.encrypt
    #aes.padding = 0
    aes.key = hex_to_bytes(key)
    aes.iv = hex_to_bytes(iv) if iv != nil
    str = aes.update(data) + aes.final
    return bytes_to_hex(str)
  end
end