var myTest;

describe('Teste de coisas', {

	'before all': function(){
		myTest = 'teste';
	},

	'should have value equals to a string "teste"': function(){
		value_of(myTest).should_be('teste');
	}

});
