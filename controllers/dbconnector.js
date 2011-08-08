PlayerDB={
    db:null,
    setup:function(){
        PlayerDB.db=openDatabase('PlayLists', '1.0', 'saving Playlist',  5*1024*1024);
        PlayerDB.db.transaction(function(tx) {
            tx.executeSql("create table if not exists " +
                "playlist(id integer primary key asc,name string, list string , moqra2 integer)",
                [],
                function() {
                    console.log("DB ON.....");
                },
                PlayerDB.onError);
        });
    },
    savePlayList:function(name,list,moqra2){
        PlayerDB.db.transaction(function(tx) {
            tx.executeSql("INSERT INTO playlist(name,list,moqra2) values(?,?,?)", [name,list,moqra2],
                null,
                PlayerDB.onError);
        });
    },
    selectALLPlayList:function(callback){
        PlayerDB.db.transaction(
            function(tx) {
                tx.executeSql("SELECT * FROM playlist", [],
                    function(tx, result) {
                        callback(result.rows);
                    }, null);
            }
            );
    },
    deletePlayListByID:function(id,callback){
        PlayerDB.db.transaction(
            function(tx) {
                tx.executeSql("delete FROM playlist where id = " + id, [],
                    function(tx, result) {
                        callback(result.rows);
                    }, null);
            }
            );
    },
    deleteALLPlayList:function(callback){
        PlayerDB.db.transaction(
            function(tx) {
                tx.executeSql("delete  FROM playlist", [],
                    function(tx, result) {
                        callback(result.rows);
                    }, null);
            }
            );
    },
    onError: function(tx,error) {
        console.log("Error occurred: ", error);
    }
}