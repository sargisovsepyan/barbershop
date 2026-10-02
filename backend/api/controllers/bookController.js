'use strict';

const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const Book = mongoose.model('book');

function createMailTransport() {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.MAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sendBookingEmail(booking) {
  const transporter = createMailTransport();

  if (!transporter) {
    return;
  }

  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to: process.env.MAIL_TO || process.env.MAIL_USER,
    subject: 'New barbershop booking',
    html: '<div style="margin:0;padding:10px;background-color:#fefefa;border:2px solid #000">' +
      '<h3>Имя: ' + escapeHtml(booking.name) + '</h3>' +
      '<h3>Телефон: ' + escapeHtml(booking.phone) + '</h3>' +
      '<h3>Услуга: ' + escapeHtml(booking.service) + '</h3>' +
      '<h3>Дата: ' + escapeHtml(booking.dateOfService) + '</h3>' +
      '<h3>Время: ' + escapeHtml(booking.time) + '</h3>' +
      '<h3>Примечание: ' + escapeHtml(booking.note) + '</h3></div>'
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.error('Booking email could not be sent. Check the mail configuration.');
    }
  });
}

exports.list_all_books = function (req, res) {
  Book.find({}, function (error, books) {
    if (error) {
      return res.status(500).send(error);
    }

    return res.json(books);
  });
};

exports.create_a_book = function (req, res) {
  const newBook = new Book(req.body);

  newBook.save(function (error, book) {
    if (error) {
      return res.status(400).send(error);
    }

    sendBookingEmail(book);
    return res.status(201).json(book);
  });
};

exports.update_a_book = function (req, res) {
  Book.findOneAndUpdate(
    { _id: req.params.bookId },
    req.body,
    { new: true },
    function (error, book) {
      if (error) {
        return res.status(400).send(error);
      }

      if (!book) {
        return res.status(404).json({ message: 'Booking not found.' });
      }

      sendBookingEmail(book);
      return res.json(book);
    }
  );
};

exports.read_a_book = function (req, res) {
  const dateOfService = req.params.dateOFC.replace(/ /g, '');

  Book.find({ dateOfService: dateOfService, booked: false }, function (error, result) {
    if (error) {
      return res.status(500).send(error);
    }

    return res.json(result);
  });
};

exports.delete_a_book = function (req, res) {
  Book.remove({ _id: req.params.bookId }, function (error) {
    if (error) {
      return res.status(500).send(error);
    }

    return res.json({ message: 'Booking successfully deleted.' });
  });
};
