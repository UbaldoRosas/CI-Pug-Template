"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var API=function(){function API(){_classCallCheck(this,API);}_createClass(API,null,[{key:"filter_products",value:function filter_products(filter){if(filter!="todos"){products.hide();products.filter('[data-categoria="'+filter+'"]').show();}else{products.show();}}},{key:"add_product",value:function add_product(){dialog_buttons.prop('disabled',true);dialog_line.open();var form=$('#product-form')[0];var formData=new FormData(form);formData.append('tipo',form.tipo.value);$.ajax({type:"POST",url:"/api/add-producto",data:formData,contentType:false,cache:false,processData:false,success:function success(response){if(response){var product=JSON.parse(response);$('.cards-container').prepend(API.product_card(product));API.filter_products($('.mdc-tab--active').data('filter'));dialog_line.close();edit_dialog.close();snackbar.labelText='Producto agregado';snackbar.open();$('.product-card__edit-button').off('click').click(function(){API.get_product($(this).data('id'));});products=$('.product');$('.product-card__delete-button').off('click').click(function(){$(this).addClass('active');dialog_buttons.prop('disabled',false);delete_dialog.open();});}}});}},{key:"get_product",value:function get_product(id){$('#add-product-form-button').hide();$('#edit-product-form-button').show();$.ajax({type:"POST",url:"/api/get-product",data:{id:id},success:function success(response){var product=JSON.parse(response);API.clear_dialog_content();$('#product-image-folder').val(product.folder);$('#product-form-category').val(product.categoria);$('#product-form-unit').val(product.unidad);$('#product-form-name').val(product.nombre);$('#product-form-type').find('option[value="'+product.tipo.toLowerCase()+'"]').prop('selected',true);$('#product-form-description').val(product.descripcion);$('#product-form-peso-pieza').val(product.peso_pieza);$('#product-form-peso-caja').val(product.peso_caja);$('#product-form-temperatura').val(product.temperatura);$('#product-form-temperatura-transp').val(product.temperatura_transp);$('#product-form').attr('data-id',product.id);if(product.imagen!==""){$('#product-form-media').append(API.get_product_images(product));$('.product-image__card').eq(0).find('.hover-image-field').addClass('hide');if($('.product-image__card').length>1&&product.hover_image=="1"){$('.product-image__card').eq(1).find('.hover-image-check').prop('checked',true).addClass('active');}$('.main-image-check').change(function(event){$('.hover-image-field').removeClass('hide');$(this).parentsUntil('.product-image__card').find('.hover-image-field').addClass('hide').find('.hover-image-check').removeClass('active').prop('checked',false);});}$('.product-image__card-delete').click(function(){API.delete_dialog_image($(this));});var rapidin_checkbox=$('#product-form-rapidin');if(API.check_is_pollo()){$('#product-form-subcategory').find('option[value="'+product.subcategoria+'"]').attr('selected',true);$('label[for="product-form-subcategory"]').addClass('mdc-floating-label--float-above');product.rapidin=="1"?rapidin_checkbox.prop('checked',true):rapidin_checkbox.prop('checked',false);}else{rapidin_checkbox.prop('check',false);}$('.hover-image-check').change(function(){API.set_hover_image($(this));});$('#product-form-category').val()=="huevo"?$('option[value="congelado"]').prop({hidden:true,selected:false,disabled:true}).prev().prop('selected',true).parent().val('fresco'):$('option[value="congelado"]').prop({hidden:false,disabled:false});dialog_buttons.prop('disabled',false);dialog_line.close();edit_dialog.open();$('.mdc-dialog').find('.mdc-text-field__input').each(function(index,element){var $this=$(element);var label=$this.next().find('label');label.parent().removeAttr('style');if($this.val()!==""){label.addClass('mdc-floating-label--float-above');}else{label.removeClass('mdc-floating-label--float-above');}});}});}},{key:"edit_product",value:function edit_product(id){dialog_buttons.prop('disabled',true);dialog_line.open();var dialog_images=API.get_dialog_images();var form=$('#product-form')[0];var formData=new FormData(form);formData.append('id',id);if(dialog_images){formData.append('curr_images',dialog_images.all);if(dialog_images.hover!=""){formData.append('hover_image',"1");}else{formData.append('hover_image',"");}}else{formData.append('curr_images',"");formData.append('hover_image',"");}$.ajax({type:"POST",url:"/api/edit-product",data:formData,contentType:false,cache:false,processData:false,success:function success(response){if(response){var active_filter=$('.mdc-tab--active').data('filter');var product_card=$('.product').filter('[data-id="'+id+'"]');var src_image="";if(dialog_images){src_image+=dialog_images["default"];}if(product_card.length<1){var product=JSON.parse(response);$('.cards-container').prepend(API.product_card(product));setTimeout(function(){dialog_line.close();edit_dialog.close();snackbar.labelText='Producto agregado';snackbar.open();},1500);$('.product-card__edit-button').off('click').click(function(){API.get_product($(this).data('id'));});products=$('.product');$('.product-card__delete-button').off('click').click(function(){$(this).addClass('active');dialog_buttons.prop('disabled',false);delete_dialog.open();});}else{setTimeout(function(){product_card.attr('data-categoria',form.categoria.value);product_card.find('img').attr('src',"/assets/img/catalogo/".concat(id,"/").concat(src_image));product_card.find('.product-name').text(form.nombre.value);product_card.find('.product-unidad').text(form.unidad.value);API.filter_products(active_filter);dialog_line.close();edit_dialog.close();snackbar.labelText='Producto actualizado';snackbar.open();},1000);}}}});}},{key:"delete_product",value:function delete_product(id){$.ajax({type:"POST",url:"/api/delete-product",data:{id:id},success:function success(response){snackbar.labelText='Producto eliminado';snackbar.open();$('.product[data-id="'+id+'"]').remove();}});}},{key:"update_product_order",value:function update_product_order(prod_id,index){var data={id:prod_id,order:index};$.ajax({type:"post",url:"/api/update-prod-order",data:data,success:function success(response){console.log('response',response);}});}},{key:"get_uploaded_images",value:function get_uploaded_images(){var return_array=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;var images=[];var images_object=$('#product-form-imagenes')[0].files;for(var image in images_object){if(images_object.hasOwnProperty(image)){var image_name=images_object[image].name;images.push(image_name);}}return return_array?images:images.join(', ');}},{key:"get_product_images",value:function get_product_images(product){var cards="";var arr_images=product.imagen.split(",");for(var i=0;i<arr_images.length;i++){var image=util.cleanString(arr_images[i]);var src="/assets/img/catalogo/".concat(product.id,"/").concat(image);if(deleted_images.indexOf(image)==-1){cards+=this.dialog_image_card(src,image,i);}}return cards;}},{key:"update_product_images",value:function update_product_images(product){var cards=this.get_product_images(product);$('.product-image__card').remove();$('#product-form-media').append(cards);$('.product-image__card').eq(0).find('.hover-image-field').addClass('hide');if(product.hover_image=="1"){$('.product-image__card').eq(1).find('.hover-image-check').addClass('active').prop('checked',true);}$('.hover-image-check').change(function(){API.set_hover_image($(this));});$('.main-image-check').change(function(event){$('.hover-image-field').removeClass('hide');$(this).parentsUntil('.product-image__card').find('.hover-image-field').addClass('hide').find('.hover-image-check').removeClass('active').prop('checked',false);});$('.product-image__card-delete').click(function(){API.delete_dialog_image($(this));});}},{key:"product_card",value:function product_card(product){var folder=product.id;var image="";if(product.imagenes){image=product.imagenes.split(",")[0];}return"<div class=\"product-card__container product\" data-id=\"".concat(product.id,"\" data-categoria=\"").concat(product.categoria,"\">\n                    <div class=\"mdc-card product-card\">\n                        <div tabindex=\"0\">\n                            <div class=\"mdc-card__media mdc-card__media--16-9 product-card__media\">\n                                <img src=\"/assets/img/catalogo/").concat(folder,"/").concat(image,"\" alt=\"\">\n                            </div>\n                            <div class=\"product-card__primary\">\n                                <h2 class=\"product-card__title product-name mdc-typography mdc-typography--headline6\" data-nombre>").concat(product.nombre,"</h2>\n                                <h3 class=\"product-card__subtitle product-unidad secondary-text mdc-typography mdc-typography--body2\" data-unidad>").concat(product.unidad,"</h3>\n                            </div>\n                        </div>\n                        <div class=\"mdc-card__actions\">\n                            <div class=\"mdc-card__action-buttons d-flex flex-justify-between min-w-full\">\n                                <button class=\"mdc-button mdc-card__action mdc-card__action--button product-card__edit-button\" data-id=\"").concat(product.id,"\">Editar</button>\n                                <span class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon product-card__delete-button\" title=\"Delete\" data-id=\"").concat(product.id,"\">delete</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>");}},{key:"dialog_image_card",value:function dialog_image_card(src,image,forloop_index){var checked=forloop_index==0?'checked':'';return"\n            <div class=\"mdc-card product-card product-image__card\" data-image=\"".concat(image,"\">\n                <div tabindex=\"0\">\n                    <div class=\"mdc-card__media mdc-card__media--16-9\" style=\"background-image: url('").concat(src,"');\"></div>\n                    <div class=\"mdc-card__actions\">\n                        <div class=\"mdc-card__action-buttons min-w-full d-flex flex-justify-between\">\n                            <div>\n                                <div class=\"mdc-form-field main-image-field\">\n                                    <div class=\"mdc-radio\">\n                                        <input class=\"mdc-radio__native-control main-image-check\" type=\"radio\" id=\"").concat(image,"\" name=\"default_image\" value=\"").concat(image,"\" ").concat(checked,">\n                                        <div class=\"mdc-radio__background\">\n                                            <div class=\"mdc-radio__outer-circle\"></div>\n                                            <div class=\"mdc-radio__inner-circle\"></div>\n                                        </div>\n                                    </div>\n                                    <label for=\"").concat(image,"\">Principal</label>\n                                </div>\n                                <div class=\"mdc-form-field hover-image-field\">\n                                    <div class=\"mdc-checkbox\">\n                                        <input type=\"checkbox\" name=\"hover_image\" value=\"").concat(image,"\" class=\"mdc-checkbox__native-control hover-image-check\" id=\"hover-image-").concat(image,"\"/>\n                                        <div class=\"mdc-checkbox__background\">\n                                            <svg class=\"mdc-checkbox__checkmark\" viewBox=\"0 0 24 24\">\n                                                <path class=\"mdc-checkbox__checkmark-path\" fill=\"none\" d=\"M1.73,12.91 8.1,19.28 22.79,4.59\"/>\n                                            </svg>\n                                            <div class=\"mdc-checkbox__mixedmark\"></div>\n                                        </div>\n                                    </div>\n                                    <label for=\"hover-image-").concat(image,"\">Hover</label>\n                                </div>\n                            </div>\n                            <span class=\"material-icons mdc-icon-button mdc-card__action mdc-card__action--icon product-image__card-delete\" title=\"Delete\">delete</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ");}},{key:"get_dialog_images",value:function get_dialog_images(){if($('.product-image__card').length>0){var default_image=$('.product-image__card').find('.mdc-radio__native-control:checked')[0].value;var hover_image=$('.hover-image-check:checked').length>0?$('.hover-image-check:checked')[0].value:"";var images={"default":default_image,hover:hover_image,all:default_image+(hover_image!=""?","+hover_image:"")};$('.product-image__card').each(function(){var image=$(this).data('image');if(image!==default_image&&image!==hover_image)images.all+=",".concat(image);});return images;}return false;}},{key:"delete_dialog_image",value:function delete_dialog_image(button){var item_is_checked=button.prev().find('.mdc-radio__native-control:checked').length>0;var image_card=button.parentsUntil('.product-card').parent();deleted_images.push(image_card.attr('data-image'));image_card.remove();if(item_is_checked){$('.product-image__card').eq(0).find('.mdc-radio__native-control').prop('checked',true).parentsUntil('.mdc-card__action-buttons').siblings('.hover-image-field').addClass('hide').find('.hover-image-check').removeClass('active').addClass('hide').prop('checked',false);}}},{key:"clear_dialog_content",value:function clear_dialog_content(){product_form.trigger('reset');$('#product-form-media').html('');$('#info-imagenes').text('');$('option[value="congelado"]').prop({hidden:false,disabled:false});}},{key:"check_is_pollo",value:function check_is_pollo(){var pollo_options=$('#product-form-pollo-options');var subcategory_hidden_option=$('#product-form-subcategory-option-hidden');if($('#product-form-category').find('option:selected').val()=="pollo"){subcategory_hidden_option.prop('hidden',true).attr('selected',false);show(pollo_options);return true;}else{subcategory_hidden_option.prop('hidden',false).attr('selected',true);hide(pollo_options);return false;}}},{key:"set_hover_image",value:function set_hover_image(checkbox){if(checkbox.hasClass('active')){checkbox.removeClass('active').prop('checked',false);}else{$('.hover-image-check').removeClass('active').prop('checked',false);checkbox.addClass('active').prop('checked',true);}}}]);return API;}();