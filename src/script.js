const $appa = $('#appa');
const $hair = $('#hair-fuzz');
const $head = $('#head-shape');
const $tongue = $('#tongue');
const $arrow = $('#arrow');
const $hornLeft = $('#horn-left');
const $hornRight = $('#horn-right');
const $horns = $('.horns');
const $cheeks = $('#cheeks');
const $eyeLeft = $('#eye-left');
const $eyeRight = $('#eye-right');
const $eyes = $('.eyes');
const $midFace = $('#mid-face');
const $lowerFace = $('#lower-face');
const $nose = $('#nose');
const $noseWrapper = $('#nose-wrapper');
const $nostrilLeft = $('#nostril-left');
const $nostrilRight = $('#nostril-right');
const $nostrils = $('.nostrils');
const $chin = $("#chin");
const $lowerJaw = $('#lower-jaw');
const $upperJaw = $('#upper-jaw');
const $text = $('#text');
const $textWrap = $('.text-wrapper');
const $button = $('button');

const Appa = {
  isAnimating: false,
  mouthOpen: false,
  tongueShowing: true,
  tonguePos: 'l',
  isSpeaking: false,
  idleAnimation: null,

  simpleAnimations: [
    'wiggleEars',
    'cockHead',
    'sniff',
    'toggleTongue',
    'moveTongue',
    'lickLips'
  ],

  messages: {
    intro: [
      'hi jess! appa here.',
      `kevin told me you were a big fan of the fact that i'm a giant soft animal`,
      `and i'm pretty sure we have a lot in common.`,
      `my favorite things to do are eat and nap`,
      `but both of us have traveled around the world`,
      `mostly to find new places to sleep and eat.`,
      `kevin asked me to come down and help him out`,
      `by reading you this message for valentine's day`,
      `ahem`,
      `deeeeear jess:`,
      `since last valentine's day, so much has happened!`,
      `there's a cool baby for us to hang out with!`,
      `you started a new job helping old ladies make friends and young ladies become badasses!`,
      `we went all the way to nashville together!`,
      `we've gone out to dinner and made dinner together a bunch of times`,
      `(including tonight!)`,
      `i'm constantly grateful for having you in my life`,
      `and for you always being supportive and patient with me`,
      `and even if i don't always show it as much as i should`,
      `i love you`,
      `and i wouldn't want to go through all of these adventures without you.`,
      `now we're looking at apartments together!`,
      `i can tell that next year is going to be our best year yet`,
      `happy valentine's day, jess`,
      `love, kevin`,
      ``,
      ``,
      ``,
      `(aaaaand appa)`,
      ``,
      `whoa that kevin guy sounds really nice!`,
      `and handsome.`,
      `but hey!`,
      `if you guys have some extra space in your new apartment`,
      `maybe i could come hang out?`,
      `or maybe i could just come with you guys?`,
      `i don't need a lot-`,
      `just a big empty space and a lot of straw to munch on`,
      `i'd be ready to move in whenever you guys are!`,
      `in fact- i'm all packed and ready to go already.`,
      `i like dark spaces, where i can fall asleep and no one will bug me`,
      `actually, i'm closer than you think, right now`,
      `come find me!`
    ]
  },

  init() {
    $button.hide();
    this.playIntro();
  },

  startIdle() {
    this.playIdleAnimation();

    this.idleAnimation = setInterval(() => {
      this.playIdleAnimation();
    }, 4000);
  },

  stopIdle() {
    clearInterval(this.idleAnimation);
  },

  playIdleAnimation() {
    const idx = Math.floor(Math.random() * this.simpleAnimations.length);
    const animation = this.simpleAnimations[idx];
    this[animation]();
  },

  playIntro() {
    this.stopIdle();
    this.playMessages(this.messages.intro);
  },

  playMessages(messages) {
    const afterMessage = function() {
      this.isSpeaking = false;
      $text.addClass('ready');
      $(document).on('keypress', nextMessage);
    }.bind(this);

    const nextMessage = function(e) {
      if (e.key === 'Enter') {
        $(document).off('keypress');

        messagesIdx++;
        if (messagesIdx < messages.length) {
          const message = messages[messagesIdx];

          playMessage(message, afterMessage);
        } else {
          setTimeout(function() {
            $text.addClass('ready');

            $(document).on('keypress', finish);
          }, 1000);
        }
      }
    }.bind(this);

    const finish = function(e) {
      if (e.key === 'Enter') {
        $textWrap.hide();
        $text.html('');

        this.startIdle();
      }

    }.bind(this);

    const playMessage = function(msg, afterMessage) {
      this.stopIdle();
      let currIdx = 0;
      $text.removeClass('ready');
      this.isSpeaking = true;
      this.speak();

      $text.html('');
      $textWrap.show();

      function continueMsg() {
        currIdx++;

        let txt = msg.substring(0, currIdx);
        $text.html(txt);

        if (currIdx < msg.length) {
          setTimeout(continueMsg, 30);
        } else {
          afterMessage();
        }
      }

      continueMsg();
    }.bind(this);

    this.isSpeaking = true;
    this.stopIdle();

    let messagesIdx = 0;
    $textWrap.show();

    playMessage(messages[messagesIdx], afterMessage);

  },

  speak() {
    if (this.isSpeaking) {
      const speed = Math.min(400, Math.floor(Math.random() * 800));
      this.openMouth(speed);

      const close = function() {
        const newSpeed = Math.min(400, Math.floor(Math.random() * 800));
        this.closeMouth(newSpeed);

        setTimeout(this.speak.bind(this), newSpeed);
      }.bind(this);

      setTimeout(close, speed);
    }
  },

  cockHead(factor=10) {
    $appa.velocity({ rotateZ: factor }, { duration: 1000 })
    .velocity({ rotateZ: factor * 1.4 }, { duration: 1000, delay: 1000 })
    .velocity({ rotateZ: 0 }, { duration: 500, delay: 500 });
  },

  moveTongue() {
    if (this.tongueShowing) {
      if (this.tonguePos === 'l') {
        this.moveTongueRight();
      } else {
        this.moveTongueLeft();
      }
    } else {
      this.showTongue();
    }
  },

  moveTongueRight() {
    $tongue.velocity({ translateX: 60, translateY: -10 }, { duration: 200, easing: 'linear' })
      .velocity({ rotateY: 180 }, 0)
      .velocity({ translateX: 120, translateY: 0 }, { duration: 200, easing: 'linear' })
      .velocity({ translateX: 140, translateY: 4 }, { duration: 400 })
      .velocity({ translateX: 120, translateY: 0 }, { duration: 200 });
  },

  moveTongueLeft() {
    $tongue.velocity({ translateX: 60, translateY: -10 }, { duration: 200, easing: 'linear' })
      .velocity({ rotateY: 0 }, 0)
      .velocity({ translateX: 0, translateY: 0 }, { duration: 200, easing: 'linear' })
      .velocity({ translateX: -20, translateY: 4 }, { duration: 600 })
      .velocity({ translateX: 0, translateY: 0 }, { duration: 200 });
  },

  wiggleTongue() {
    $tongue.velocity({ translateX: 40, translateY: -10, rotateZ: -20 }, 400)
    .velocity({ rotateZ: 5, translateX: 30 }, { duration: 300, delay: 700 })
    .velocity({ translateX: 0, rotateZ: 0, translateY: 0 }, { duration: 1000, delay: 700 });
  },

  lickLips() {
    $tongue.velocity({ translateY: -40 }, 500)
    .velocity({ translateX: -70 }, { delay: 500 })
    .velocity({ translateY: 10, rotateX: -20 }, { duration: 500, delay: 300 })
    .velocity({ translateY: -10, 'z-index': 610, rotateX: 180 }, 0)
    .velocity({ translateX: -30, rotateZ: 10 }, { duration: 600, easing: 'linear' })
    .velocity({ translateY: -30, translateX: 20, rotateZ: 20 }, { duration: 300, easing: 'linear' })
    .velocity({ translateY: -35, translateX: 50, rotateZ: 10 }, { duration: 300, easing: 'linear' })
    .velocity({ translateY: -35, translateX: 65, rotateZ: 10 }, { duration: 300, easing: 'linear' })
    .velocity({ rotateY: 180, rotateZ: 10 }, 0)
    .velocity({ translateY: -35, translateX: 80,  rotateZ: -5 }, { duration: 300, easing: 'linear' })
    .velocity({ translateY: -35, translateX: 100, rotateZ: -5 }, { duration: 300, easing: 'linear' })
    .velocity({ translateY: -30, translateX: 130, rotateZ: -10 }, { duration: 300, easing: 'linear' })
    .velocity({ translateY: -20, translateX: 170, rotateZ: -10 }, { duration: 300, easing: 'linear' })
    .velocity({ translateY: -15, translateX: 200, rotateZ: -10 }, { duration: 300, easing: 'linear' })
    .velocity({ translateY: -15, translateX: 220, rotateZ: 10 }, { duration: 300, easing: 'linear' })
    .velocity({ translateY: -20, translateX: 250, rotateZ: 20 }, { duration: 300, easing: 'linear' })
    .velocity({ rotateX: 0, translateY: 10, rotateZ: -10, 'z-index': 300 }, 0)
    .velocity({ translateY: -40 }, 500)
    .velocity({ translateX: '', rotateX: '', rotateY: '', rotateZ: '' }, 0)
    .velocity({ translateY: 0 }, 500);
  },

  toggleMouth() {
    const speed = Math.random() * 500;

    if (this.mouthOpen) {
      this.closeMouth(speed);
    } else {
      this.openMouth(speed);
    }
  },

  openMouth(speed=200) {
    this.mouthOpen = true;
    $tongue.velocity({ translateY: -70 }, speed / 2);
    $lowerJaw.velocity({ translateY: 70 }, speed);
    $upperJaw.velocity({ translateY: 70 }, speed);
    $chin.velocity({ translateY: 70 }, speed);
  },

  closeMouth(speed=200) {
    this.mouthOpen = false;

    if (!this.isSpeaking) {
      $tongue.velocity({ translateY: 0 }, { duration: speed, delay: speed / 2 });
    }

    $lowerJaw.velocity({ translateY: 0 }, speed);
    $upperJaw.velocity({ translateY: 0 }, speed);
    $chin.velocity({ translateY: 0 }, speed);
  },

  roar() { // 2100
    this.openMouth(1000);
    $appa.velocity({ rotateZ: 2, rotateX: 30 }, 300);
    $appa.velocity({ rotateZ: -2, rotateX: -30 }, 300);
    $appa.velocity({ rotateZ: 2, rotateX: 30 }, 300);
    $appa.velocity({ rotateZ: -2, rotateX: -30 }, 300);
    this.closeMouth(1000);
    $appa.velocity({ rotateZ: 2, rotateX: 30 }, 300);
    $appa.velocity({ rotateZ: -2, rotateX: -30 }, 300);
    $appa.velocity({ rotateZ: 0, rotateX: 0 }, 300);
  },

  toggleTongue() {
    this.showingTongue ? this.showTongue() : this.retractTongue();
  },

  showTongue() { // 500
    this.showingTongue = true;
    $tongue.velocity({ translateY: [0, -40] }, 500);
  },

  retractTongue() { // 500
    this.showingTongue = false;
    $tongue.velocity({ translateY: [-40, 0] }, 500);
  },

  sniff() { // 400
    $nose.velocity({ scale: 1.1 }, 100);
    $nose.velocity({ scale: 1 }, 100);
    $nose.velocity({ scale: 1.1 }, 100);
    $nose.velocity({ scale: 1 }, 100);
  },

  wiggleHead() { // 400
    this.wiggleEars();
    $hair.velocity({ translateY: -5 }, 300);
    $cheeks.velocity({ translateY: -10 }, 400);
    $noseWrapper.velocity({ translateY: -5 }, 300);

    $hair.velocity({ translateY: 0 }, 300);
    $cheeks.velocity({ translateY: 0 }, 400);
    $noseWrapper.velocity({ translateY: 0 }, 300);
  },

  wiggleEars() { // 400
    $hornLeft.velocity({ rotateZ: 10 }, 200).velocity({ rotateZ: 0 }, 200);
    $hornRight.velocity({ rotateZ: -10 }, 200).velocity({ rotateZ: 0 }, 200);

    $hornLeft.velocity({ rotateZ: 10 }, 200).velocity({ rotateZ: 0 }, 200);
    $hornRight.velocity({ rotateZ: -10 }, 200).velocity({ rotateZ: 0 }, 200);
  },

  wiggleNose() { // 1100
    $cheeks.velocity({ rotateZ: 1, translateX: -10 }, 300)
    .velocity({ rotateZ: -1, translateX: 10 }, 300)
    .velocity({ rotateZ: 1, translateX: -10 }, 300)
    .velocity({ rotateZ: 0, translateX: 0 }, 200);

    $noseWrapper.velocity({ scale: 1.1, rotateZ: 4, translateX: -5 }, 300)
    .velocity({ scale: 1, rotateZ: -4, translateX: 5 }, 300)
    .velocity({ scale: 1.1, rotateZ: 4, translateX: -5 }, 300)
    .velocity({ scale: 1, rotateZ: 0, translateX: 0 }, 200);

    $tongue.velocity({ rotateZ: 3, translateX: 3 }, 300)
    .velocity({ rotateZ: -3, translateX: -3 }, 300)
    .velocity({ rotateZ: 3, translateX: 3 }, 300)
    .velocity({ rotateZ: 0, translateX: 0 }, 200)

    $chin.velocity({ rotateZ: 5 }, 300)
    .velocity({ rotateZ: -5 }, 300)
    .velocity({ rotateZ: 5 }, 300)
    .velocity({ rotateZ: 0 }, 200)

    wiggleEars();
  }
}

$button.on('click', Appa.init.bind(Appa));

Appa.startIdle();
