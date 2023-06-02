# Sprint Challenge: Gelişmiş React

## Giriş

Bu challengeda bir [WIDGET](https://advanced-react-grid.herokuapp.com/) için bir uygulama geliştireceksiniz.

İşlevini inceleyin ve ayrıca **Chrome Geliştirici Araçları'nda** Konsolu, Ağ sekmesini ve Öğeler sekmesini inceleyin:

- Widget'ın aynı işlevselliğe sahip iki sürümü vardır: class-based ve fonksiyonel (biz fonksiyonel kısmıyla ilgileniyoruz).
- Sayfanın altındaki input kutusu, geçerli bir e-posta adresi girilmesini bekler.
- Ağ sekmesinde "Önizleme" altında görebileceğiniz gibi, e-posta doğrulama hataları sunucudan gelir.
- Form gönderiminde sunucuya gönderilen payload, Ağ sekmesinde "Payload" altında görülebilir
- Özellikle 1 geçerli email, `foo@bar.baz`, **"Forbiden" sunucu hatasıyla cevap verir**❗
- Koordinatların orijini Gridin sol üst köşesindedir.

## Gereklilikler

### Araçlar

- Node 16.x
- NPM 8.x (`npm i -g npm` NPM güncellemek için)
- Unix-benzeri bir shell (Gitbash/bash/zsh)
- Chrome >= 100.x

❗ Diğer versiyonlarda da çalışabilir fakat test edilmedi.

## Proje Kurulumu

- Forklayın, klonlayın, ve `npm install`. (Başka bir kütüphaneye ihtiyaç yok.)
- Projeyi çalıştırmak için `npm run dev`.
- `http://localhost:3000`.
- Testler için `npm test`. Test dosyaları `codegrade_mvp.test.js` ve `App.test.js`.

## API

- Uygulama bir API uç noktasına sahip: `POST http://localhost:9000/api/result`.
- Postman gibi bir HTTP istemcisi kullanarak bu uç noktayı deneyebilirsiniz.
- Uç nokta şu şekilde bir payloada gereksinim duyuyor: `{ "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" }`:
  - `x` 1 ile 3 arasında bir integer olmalı.
  - `y` 1 ile 3 arasında bir integer olmalı.
  - `steps` 0 dan büyük bir integer olmalı.
  - `email` geçerli bir email adresi olmalı.
- Eğer payload hatalı gönderilirse bir "Unprocessable Entity"(İşlenemez Varlık) sunucu cevabı döner.

## MVP

### MVP 1, Grid

- Bu README'nin üst kısmında bağlantısı verilen prototipte gösterilen **işlevselliği ve DOM**'u kopyalayın.
- Kodlarınızı `frontend/components/AppFunctional.js` dosyasına yazın.
- "AppFunctional.js" tarafından sunulan bileşen, stateful olan işlevsel bir bileşen olmalıdır.
- Bileşenleriniz tarafından üretilen DOM, prototipteki DOM ile tam olarak eşleşmelidir:
  - HTML öğelerinin hiyerarşisi, idleri, class adları vb. aynı olmalıdır..
  - Geçerli kare, büyük bir B ve "active" class adıyla işaretlenmiştir. 
  - Sayfada görüntülenen submit başarısı ve hata mesajları API'den gelir.(Network tabını inceleyin).
  - Frontend form doğrulama eklemenize gerek yok.
- Gridin her bir karesinin koordinatları aşağıdaki gibidir:

  ```js
    (1, 1) (2, 1) (3, 1)
    (1, 2) (2, 2) (3, 2)
    (1, 3) (2, 3) (3, 3)
  ```

❗ TÜM TESTLER GEÇMELİ

### MVP 2, Test

- `codegrade_mvp.test.js` den ilham alarak `frontend/components/App.test.js` içine 5 tane test kodu yazın:
  - Test dosyanızın içine seçtiğiniz bir bileşeni import edin, `AppFunctional.js`.
  - Başlıklardaki, butonlardaki, bağlantılardaki görünür metinlerin ekranda göründüğünü test edin.
  - Inputa metin girildiğinde value değişimini test eden bir test yazın.

### Gridle ilgili diğer notlar:

- `AppFunctional` içinde bazı önerilen stateler ve yardımcı fonksiyonlar bulacaksınız. Bunları kullanmaktan çekinmeyin.
- Karelerin durumunu izlemek için karmaşık bir yapıya ihtiyacınız yok çünkü karelerde herhangi bir bilgi depolamıyoruz.
- Gridin --yalnızca görsel olarak- üç sıraya bölünmüş tek boyutlu bir dizi olduğunu hayal edin..
- Gridi sürmek için ihtiyaç duyduğunuz tek bileşen statei, 0 ile 8 arasında bir tamsayıdır: **"B" nin indexi şu satırda.**
- Koordinatlar gibi diğer bilgi parçaları bu dizinden türetilebilir ve kendi statelerine ihtiyaç duymazlar.
- Hayatı kendiniz için daha karmaşık (veya ilginç) hale getirmek istiyorsanız, gridin stateini saklamak için başka yapılar kullanılabilir:

  ```js
  // Bir gridi temsil etmek için düz bir dizi kullanılabilir.
  // Ancak Uygulama bileşenimizin tüm diziyi izlemesi gerekmez, yalnızca "B"nin olduğu dizini izlemesi gerekir.
  [null, null, null, null, "B", null, null, null, null]

  // Bir gridi temsil etmek için 2 boyutlu diziler veya matrisler kullanılabilir, ancak bu, bu projede önerilmez:
  [[null, null, null], [null, "B", null], [null, null, null]]

  // Bir string de işe yarayabilir, ancak JS'deki stringler değişmezdir ve bu yaklaşımı elverişsiz hale getirir:
  "xxxxBxxxx"
  ```