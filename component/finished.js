/*
 MIT License

 Copyright (c) 2018 monya-wallet zenypota

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/
const coinUtil = require("../js/coinUtil.js")
const currencyList = require("../js/currencyList.js")
module.exports=require("../js/lang.js")({ja:require("./ja/finished.html"),en:require("./en/finished.html")})({
  data(){
    return {
      loading:false
    }
  },
  store:require("../js/store.js"),
  methods:{
    start(){
      this.loading=true
      coinUtil.shortWait().then(()=>{
        this.loading=false
        if(this.$store.state.finishNextPage.page){
          this.$emit("replace",this.$store.state.finishNextPage.page)
        }else{
          this.$emit("pop")
        }
        this.$store.commit("setFinishNextPage",{infoId:"",payload:{}})
      })
      
    },

    openExplorer(){
      if (this.payload.coinId === "monaparty") {
        coinUtil.openUrl("https://mpchain.info/tx/" + this.payload.txId)
      } else if (this.payload.coinId === "eth") {
        coinUtil.openUrl("https://etherscan.io/tx/" + this.payload.txId)
      } else {
        currencyList.get(this.payload.coinId).openExplorer({txId:this.payload.txId});
      }
    }
  },
  computed:{
    infoId(){
      return this.$store.state.finishNextPage?this.$store.state.finishNextPage.infoId:""
    },
    payload(){
      return this.$store.state.finishNextPage.payload
    }
  }
})
