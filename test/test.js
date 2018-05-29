let transfer = require('../src/');
let assert = require('assert');



describe('Transfer函数测试', function() {
	describe('#不合法IP，传入对象不是String', function() {
		it('new Date()', function() {
			assert.equal(transfer(new Date()).errorCode, 1);
		});
	});

	describe('#不合法IP，IP段不是4个', function() {
	  it('172.168.5.1.2', function() {
	  	assert.equal(transfer('172.168.5.1.2').errorCode, 2);
	  });
	});

	describe('#不合法IP，传入数据存在不合法字符', function() {
		it('192.168.A1.1', function() {
			assert.equal(transfer("192.168.A1.1").errorCode, 3);
		});
	});

	describe('#不合法IP，IP数字太大', function() {
		it('256.168.0.1', function() {
			assert.equal(transfer("256.168.0.1").errorCode, 4);
		});
		it('5000.168.0.1', function() {
			assert.equal(transfer("5000.168.0.1").errorCode, 4);
		});
	});

	describe('#不合法IP，开头有 .', function() {
		it('.168.0.1', function() {
			assert.equal(transfer(".168.0.1").errorCode, 5);
		});
	});

	describe('#不合法IP，空格位置不对', function() {
		it('192.1 68.0.1', function() {
			assert.equal(transfer("192.1 68.0.1").errorCode, 6);
		});
	});

	describe('#合法IP', function() {
		it('172.168.5.1', function() {
			assert.equal(transfer('172.168.5.1'), 2896692481);
		});
		it('172 .168 .5.1', function() {
			assert.equal(transfer('172 .168 .5.1'), 2896692481);
		});
		it('172 .1 .5.1', function() {
			assert.equal(transfer('172 .1 .5.1'), 2896692481);
		});
	});
});