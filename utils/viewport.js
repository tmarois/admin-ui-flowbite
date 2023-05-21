export const viewport = (element) => {
    const elem = document.querySelector(element);
	if (!elem) return [];
	const bounding = elem.getBoundingClientRect();
	let outOfViewport = [];
	if (bounding.top < 0) outOfViewport.push('top');
	if (bounding.left < 0) outOfViewport.push('left');
	if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) outOfViewport.push('bottom');
	if (bounding.right > (window.innerWidth || document.documentElement.clientWidth)) outOfViewport.push('right');
	return outOfViewport;
}

export const scrollPageTop = () => {
	let pagebody = document.getElementById('pagebody');
	if (pagebody) {
		pagebody.scrollTo({top: 0,behavior: "smooth"});
	}
}

// export const viewport = (element) => {
// 	const elem = document.querySelector(element);
// 	if (!elem) return undefined;
	
// 	const { top, left, bottom, right } = elem.getBoundingClientRect();
// 	const { innerHeight, innerWidth } = window;
// 	const offScreenEdges = [];
  
// 	switch (true) {
// 	  case top < 0:
// 		offScreenEdges.push('top');
// 		break;
// 	  case left < 0:
// 		offScreenEdges.push('left');
// 		break;
// 	  case bottom > innerHeight || document.documentElement.clientHeight:
// 		offScreenEdges.push('bottom');
// 		break;
// 	  case right > innerWidth || document.documentElement.clientWidth:
// 		offScreenEdges.push('right');
// 		break;
// 	}
  
// 	return offScreenEdges;
//   };