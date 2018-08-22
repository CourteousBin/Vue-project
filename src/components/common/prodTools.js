let ProdTools = {};

let store = window.localStorage;

let prods = JSON.parse(localStorage.getItem('prods') || '{}');

ProdTools.addOrUpdate = function(p){
	if(prods[p.id]){
		prods[p.id] += p.num;
	}else {
		prods[p.id] = p.num;
	}	

	this.saveProd(prods);
}

// 删除
ProdTools.delete = function(id){
	delete prods[id];
	this.saveProd(prods);
}

// 获取
ProdTools.getProds = function(){
	return prods;
}

// 总数
ProdTools.getTotalCount = function(){
	let sum = 0;
	for(let id in prods){
		sum += prods[id];
	}
	return sum;
}

// 存储
ProdTools.saveProd = function(prods){
	store.setItem('prods',JSON.stringify(prods));
}

export default ProdTools;