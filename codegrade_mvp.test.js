import server from './backend/mock-server'
import React from 'react'
import AppFunctional from './frontend/components/AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

jest.setTimeout(1000) // default 5000 too long for Codegrade
const waitForOptions = { timeout: 100 }
const queryOptions = { exact: false }

let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
}

const testSquares = (squares, activeIdx) => {
  squares.forEach((square, idx) => {
    if (idx === activeIdx) {
      expect(square.textContent).toBe('B')
      expect(square.className).toMatch(/active/)
    } else {
      expect(square.textContent).toBeFalsy()
      expect(square.className).not.toMatch(/active/)
    }
  })
}

test('AppFunctional bir fonksiyonel bileşendir.', () => {
  expect(
    AppFunctional.prototype &&
    AppFunctional.prototype.isReactComponent
  ).not.toBeTruthy()
});


[AppFunctional].forEach((Component, idx) => {
  const label = idx === 0 ? 'FONKSİYONEL' : 'CLASS-BASED'

  describe(`${label}`, () => {
    beforeAll(() => { server.listen() })
    afterAll(() => { server.close() })
    beforeEach(() => {
      render(<Component />)
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
    })
    afterEach(() => {
      server.resetHandlers()
      document.body.innerHTML = ''
    })

    describe(`[A ${label}] Aktif Kare,`, () => {
      test(`[A1 ${label}] Aksiyonlar: yok (başlangıç statei <App />)
          Aktif kare index 4 te olmalı`, () => {
        testSquares(squares, 4)
      })
      test(`[A2 ${label}] Aksiyonlar: yukarı
          Aktif kare index 1 de olmalı`, () => {
        fireEvent.click(up)
        testSquares(squares, 1)
      })
      test(`[A3 ${label}] Aksiyonlar: yukarı, yukarı
          Aktif kare index 1 de olmalı`, () => {
        fireEvent.click(up)
        fireEvent.click(up)
        testSquares(squares, 1)
      })
      test(`[A4 ${label}] Aksiyonlar: yukarı, sol
          Aktif kare index 0 da olmalı`, () => {
        fireEvent.click(up)
        fireEvent.click(left)
        testSquares(squares, 0)
      })
      test(`[A5 ${label}] Aksiyonlar: yukarı, sol, sol
          Aktif kare index 0 da olmalı`, () => {
        fireEvent.click(up)
        fireEvent.click(left)
        fireEvent.click(left)
        testSquares(squares, 0)
      })
      test(`[A6 ${label}] Aksiyonlar: yukarı, sağ
          Aktif kare index 2 de olmalı`, () => {
        fireEvent.click(up)
        fireEvent.click(right)
        testSquares(squares, 2)
      })
      test(`[A7 ${label}] Aksiyonlar: yukarı, sağ, sağ
          Aktif kare index 2 de olmalı`, () => {
        fireEvent.click(up)
        fireEvent.click(right)
        fireEvent.click(right)
        testSquares(squares, 2)
      })
      test(`[A8 ${label}] Aksiyonlar: sağ
          Aktif kare index 5 de olmalı`, () => {
        fireEvent.click(right)
        testSquares(squares, 5)
      })
      test(`[A9 ${label}] Aksiyonlar: sağ, sağ
          Aktif kare index 5 de olmalı`, () => {
        fireEvent.click(right)
        fireEvent.click(right)
        testSquares(squares, 5)
      })
      test(`[A10 ${label}] Aksiyonlar: sağ, aşağı
          Aktif kare index 8 de olmalı`, () => {
        fireEvent.click(right)
        fireEvent.click(down)
        testSquares(squares, 8)
      })
      test(`[A11 ${label}] Aksiyonlar: sağ, aşağı, aşağı
          Aktif kare index 8 de olmalı`, () => {
        fireEvent.click(right)
        fireEvent.click(down)
        fireEvent.click(down)
        testSquares(squares, 8)
      })
      test(`[A12 ${label}] Aksiyonlar: aşağı, sol
          Aktif kare index 6 da olmalı`, () => {
        fireEvent.click(down)
        fireEvent.click(left)
        testSquares(squares, 6)
      })
      test(`[A13 ${label}] Aksiyonlar: aşağı, aşağı, sol, sol
          Aktif kare index 6 de olmalı`, () => {
        fireEvent.click(down)
        fireEvent.click(down)
        fireEvent.click(left)
        fireEvent.click(left)
        testSquares(squares, 6)
      })
    })
    describe(`[B ${label}] Koordinat okuması, `, () => {
      test(`[B1] Aksiyonlar: yok (başlangıç durumu <App />)
          Koordinatlar şurda olmalı (2,2)`, () => {
        expect(coordinates.textContent).toMatch(/\(2.*2\)$/)
      })
      test(`[B2 ${label}] Aksiyonlar: yukarı
          Koordinatlar şurda olmalı (2,1)`, () => {
        fireEvent.click(up)
        expect(coordinates.textContent).toMatch(/\(2.*1\)$/)
      })
      test(`[B3 ${label}] Aksiyonlar: yukarı, yukarı
          Koordinatlar şurda olmalı (2,1)`, () => {
        fireEvent.click(up)
        fireEvent.click(up)
        expect(coordinates.textContent).toMatch(/\(2.*1\)$/)
      })
      test(`[B4 ${label}] Aksiyonlar: yukarı, sol
          Koordinatlar şurda olmalı (1,1)`, () => {
        fireEvent.click(up)
        fireEvent.click(left)
        expect(coordinates.textContent).toMatch(/\(1.*1\)$/)
      })
      test(`[B5 ${label}] Aksiyonlar: yukarı, sol, sol
          Koordinatlar şurda olmalı (1,1)`, () => {
        fireEvent.click(up)
        fireEvent.click(left)
        fireEvent.click(left)
        expect(coordinates.textContent).toMatch(/\(1.*1\)$/)
      })
      test(`[B6 ${label}] Aksiyonlar: yukarı, sağ
          Koordinatlar şurda olmalı (3,1)`, () => {
        fireEvent.click(up)
        fireEvent.click(right)
        expect(coordinates.textContent).toMatch(/\(3.*1\)$/)
      })
      test(`[B7 ${label}] Aksiyonlar: yukarı, sağ, sağ
          Koordinatlar şurda olmalı (3,1)`, () => {
        fireEvent.click(up)
        fireEvent.click(right)
        fireEvent.click(right)
        expect(coordinates.textContent).toMatch(/\(3.*1\)$/)
      })
      test(`[B8 ${label}] Aksiyonlar: sağ
          Koordinatlar şurda olmalı (3,2)`, () => {
        fireEvent.click(right)
        expect(coordinates.textContent).toMatch(/\(3.*2\)$/)
      })
      test(`[B9 ${label}] Aksiyonlar: sağ, sağ
          Koordinatlar şurda olmalı (3,2)`, () => {
        fireEvent.click(right)
        fireEvent.click(right)
        expect(coordinates.textContent).toMatch(/\(3.*2\)$/)
      })
      test(`[B10 ${label}] Aksiyonlar: sağ, aşağı
          Koordinatlar şurda olmalı (3,3)`, () => {
        fireEvent.click(right)
        fireEvent.click(down)
        expect(coordinates.textContent).toMatch(/\(3.*3\)$/)
      })
      test(`[B11 ${label}] Aksiyonlar: right, down, down
          Koordinatlar şurda olmalı (3,3)`, () => {
        fireEvent.click(right)
        fireEvent.click(down)
        fireEvent.click(down)
        expect(coordinates.textContent).toMatch(/\(3.*3\)$/)
      })
      test(`[B12 ${label}] Aksiyonlar: aşağı, sol
          Koordinatlar şurda olmalı (1,3)`, () => {
        fireEvent.click(down)
        fireEvent.click(left)
        expect(coordinates.textContent).toMatch(/\(1.*3\)$/)
      })
      test(`[B13 ${label}] Aksiyonlar: aşağı, aşağı, sol, sol
          Koordinatlar şurda olmalı (1,3)`, () => {
        fireEvent.click(down)
        fireEvent.click(down)
        fireEvent.click(left)
        fireEvent.click(left)
        expect(coordinates.textContent).toMatch(/\(1.*3\)$/)
      })
    })
    describe(`[C ${label}] Limit aşıldı mesajı`, () => {
      test(`[C1 ${label}] Aksiyonlar: yok (başlangıç durumu <App />)
          Limit aşıldı mesajı boş olmalı`, () => {
        expect(message.textContent).toBeFalsy()
      })
      test(`[C2 ${label}] Aksiyonlar: yukarı
          Limit aşıldı mesajı boş olmalı`, () => {
        fireEvent.click(up)
        expect(message.textContent).toBeFalsy()
      })
      test(`[C3 ${label}] Aksiyonlar: yukarı, yukarı
          Limit aşıldı mesajı şöyle olmalı "Yukarıya gidemezsiniz"`, () => {
        fireEvent.click(up)
        fireEvent.click(up)
        expect(message.textContent).toBe("Yukarıya gidemezsiniz")
      })
      test(`[C4 ${label}] Aksiyonlar: yukarı, sol
          Limit aşıldı mesajı boş olmalı`, () => {
        fireEvent.click(up)
        fireEvent.click(left)
        expect(message.textContent).toBeFalsy()
      })
      test(`[C5 ${label}] Aksiyonlar: yukarı, sol, sol
          Limit aşıldı mesajı şöyle olmalı "Sola gidemezsiniz"`, () => {
        fireEvent.click(up)
        fireEvent.click(left)
        fireEvent.click(left)
        expect(message.textContent).toBe("Sola gidemezsiniz")
      })
      test(`[C6 ${label}] Aksiyonlar: yukarı, sağ
          Limit aşıldı mesajı boş olmalı`, () => {
        fireEvent.click(up)
        fireEvent.click(right)
        expect(message.textContent).toBeFalsy()
      })
      test(`[C7 ${label}] Aksiyonlar: yukarı, sağ, sağ
          Limit aşıldı mesajı şöyle olmalı "Sağa gidemezsiniz"`, () => {
        fireEvent.click(up)
        fireEvent.click(right)
        fireEvent.click(right)
        expect(message.textContent).toBe("Sağa gidemezsiniz")
      })
      test(`[C8 ${label}] Aksiyonlar: sağ
          Limit aşıldı mesajı boş olmalı`, () => {
        fireEvent.click(right)
        expect(message.textContent).toBeFalsy()
      })
      test(`[C9 ${label}] Aksiyonlar: sağ, sağ
          Limit aşıldı mesajı şöyle olmalı (3,2)`, () => {
        fireEvent.click(right)
        fireEvent.click(right)
        expect(message.textContent).toBe("Sağa gidemezsiniz")
      })
      test(`[C10 ${label}] Aksiyonlar: sağ, aşağı
          Limit aşıldı mesajı boş olmalı`, () => {
        fireEvent.click(right)
        fireEvent.click(down)
        expect(message.textContent).toBeFalsy()
      })
      test(`[C11 ${label}] Aksiyonlar: sağ, aşağı, aşağı
          Limit aşıldı mesajı şöyle olmalı "Aşağıya gidemezsiniz"`, () => {
        fireEvent.click(right)
        fireEvent.click(down)
        fireEvent.click(down)
        expect(message.textContent).toBe("Aşağıya gidemezsiniz")
      })
      test(`[C12 ${label}] Aksiyonlar: aşağı, sol
          Limit aşıldı mesajı boş olmalı`, () => {
        fireEvent.click(down)
        fireEvent.click(left)
        expect(message.textContent).toBeFalsy()
      })
      test(`[C13 ${label}] Aksiyonlar: aşağı, aşağı, sol, sol
          Limit aşıldı mesajı şöyle olmalı "Sola gidemezsiniz"`, () => {
        fireEvent.click(down)
        fireEvent.click(down)
        fireEvent.click(left)
        fireEvent.click(left)
        expect(message.textContent).toBe("Sola gidemezsiniz")
      })
    })
    describe(`[D ${label}] Adım Sayıcı.`, () => {
      test(`[D1 ${label}] Adım sayıcı başarılı bir şekilde çalışıyor`, () => {
        expect(steps.textContent).toBe("0 kere ilerlediniz")
        fireEvent.click(up)
        fireEvent.click(up)
        fireEvent.click(left)
        expect(steps.textContent).toBe("2 kere ilerlediniz")
        fireEvent.click(right)
        fireEvent.click(right)
        expect(steps.textContent).toBe("4 kere ilerlediniz")
        fireEvent.click(down)
        fireEvent.click(down)
        fireEvent.click(down)
        expect(steps.textContent).toBe("6 kere ilerlediniz")
        fireEvent.click(left)
        fireEvent.click(left)
        fireEvent.click(left)
        expect(steps.textContent).toBe("8 kere ilerlediniz")
      })
      test(`[D2 ${label}] adım sayıcı tek seferi de düzgün işledi`, () => {
        fireEvent.click(up)
        expect(steps.textContent).toBe("1 kere")
        fireEvent.click(up)
        expect(steps.textContent).toBe("1 kere ilerlediniz")
      })
    })
    describe(`[E ${label}] Reset butonu.`, () => {
      test(`[E1 ${label}] Aktif kareyi resetledi`, () => {
        fireEvent.click(up)
        fireEvent.click(up)
        fireEvent.click(left)
        testSquares(squares, 0)
        fireEvent.click(reset)
        testSquares(squares, 4)
      })
      test(`[E2 ${label}] Koordinatlar resetlendi`, () => {
        fireEvent.click(up)
        fireEvent.click(up)
        fireEvent.click(left)
        expect(coordinates.textContent).toMatch(/\(1.*1\)$/)
        fireEvent.click(reset)
        expect(coordinates.textContent).toMatch(/\(2.*2\)$/)
      })
      test(`[E3 ${label}] Mesaj resetlendi`, () => {
        fireEvent.click(up)
        fireEvent.click(up)
        expect(message.textContent).toBe("Yukarıya gidemezsiniz")
        fireEvent.click(reset)
        expect(message.textContent).toBeFalsy()
      })
      test(`[E4 ${label}] Adımlar resetlendi`, () => {
        fireEvent.click(up)
        fireEvent.click(up)
        fireEvent.click(left)
        expect(steps.textContent).toBe("2 kere ilerlediniz")
        fireEvent.click(reset)
        expect(steps.textContent).toBe("0 kere ilerlediniz")
      })
      test(`[E5 ${label}] Email input resetlendi`, () => {
        fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
        expect(email).toHaveValue('lady@gaga.com')
        fireEvent.click(reset)
        expect(email.value).toBeFalsy()
      })
    })
    describe(`[F ${label}] Submit Butonu`, () => {
      test(`[F1 ${label}] Aksiyonlar: yukarı, email gir, submit
          Başarılı mesajı doğru`, async () => {
        fireEvent.click(up)
        fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
        fireEvent.click(submit)
        await screen.findByText('lady win #31', queryOptions, waitForOptions)
      })
      test(`[F2 ${label}] Aksiyonlar: aşağı, aşağı, email gir, submit
          Başarılı mesajı doğru`, async () => {
        fireEvent.click(down)
        fireEvent.click(down)
        fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
        fireEvent.click(submit)
        await screen.findByText('lady win #43', queryOptions, waitForOptions)
      })
      test(`[F3 ${label}] Aksiyonlar: yukarı, aşağı, sol, sağ, email gir, submit
          Başarılı mesajı doğru`, async () => {
        fireEvent.click(up)
        fireEvent.click(down)
        fireEvent.click(left)
        fireEvent.click(right)
        fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
        fireEvent.click(submit)
        await screen.findByText('lady win #73', queryOptions, waitForOptions)
      })
      test(`[F4 ${label}] Aksiyonlar: aşağı, sağ, submit
          Mail girilmediğinde hata mesajı doğru`, async () => {
        fireEvent.click(down)
        fireEvent.click(right)
        fireEvent.click(submit)
        await screen.findByText('Ouch: email is required', queryOptions, waitForOptions)
      })
      test(`[F5 ${label}] Aksiyonlar: aşağı, sağ, type invalid email, submit
          geçersiz Mail girildiğinde hata mesajı doğru`, async () => {
        fireEvent.click(down)
        fireEvent.click(right)
        fireEvent.change(email, { target: { value: 'bad@email' } })
        fireEvent.click(submit)
        await screen.findByText('Ouch: email must be a valid email', queryOptions, waitForOptions)
      })
      test(`[F6 ${label}] Aksiyonlar: down, right, type foo@bar.baz email, submit
          Banlı email hata mesajı doğru`, async () => {
        fireEvent.click(down)
        fireEvent.click(right)
        fireEvent.change(email, { target: { value: 'foo@bar.baz' } })
        fireEvent.click(submit)
        await screen.findByText('foo@bar.baz failure #71', queryOptions, waitForOptions)
      })
      test(`[F7 ${label}] Aksiyonlar: left, type valid email, submit
          Gönderildiğinde email inputu resetleniyor`, async () => {
        fireEvent.click(left)
        fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
        fireEvent.click(submit)
        await screen.findByText('lady win #29', queryOptions, waitForOptions)
        expect(email.value).toBeFalsy()
      })
      test(`[F8 ${label}] Aksiyonlar: up, right, type valid email, submit
          Gönderme adımları ve koordinatları sıfırlamıyor`, async () => {
        fireEvent.click(up)
        fireEvent.click(right)
        fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
        fireEvent.click(submit)
        await screen.findByText('lady win #49', queryOptions, waitForOptions)
        expect(coordinates.textContent).toMatch(/\(3.*1\)$/)
        expect(steps.textContent).toBe('2 kere ilerlediniz')
      })
    })
  })
})
