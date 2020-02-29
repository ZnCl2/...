const NAME = 'tempsaveMsginput';

let innerState = {
	msgBodies: {}
};

const funcInputExt = (NAME, _self) => {
	return {
		props: {
			msgBody: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				msgBodies: {}
			};
		},
		mounted() {
			(async () => {
				let rtrn = await new Promise((resolve, reject) => {
					let resolveId = (NAME + new Date().valueOf()).toString();
					_self.promise.addOnceId(resolveId, data => {
						if (
							data.hasOwnProperty(NAME + '_innerState.msgBodies')
						) {
							resolve(data[NAME + '_innerState.msgBodies']);
						}
					});
					_self.worker.postMessage({
						[NAME + '_getInnerState.msgBodies']: true,
						resolveId
					});
				});
				return rtrn;
			})().then(msgBodies => {
				this.msgBodies = msgBodies;
				this.$nextTick(() => {
					this.recoverMsgBody();
				});
			});
		},
		computed: {
			storedMsgBody() {
				let curConversation = this.$store.getters[
					'ConversationProviders/state_curConversation'
				];
				if (
					this.msgBodies.hasOwnProperty(curConversation.providerName)
				) {
					if (
						this.msgBodies[
							curConversation.providerName
						].hasOwnProperty(curConversation.conversationId)
					) {
						return this.msgBodies[curConversation.providerName][
							curConversation.conversationId
						];
					}
				}
				return '';
			}
		},
		methods: {
			recoverMsgBody() {
				this.$emit('update:msgBody', this.storedMsgBody);
			}
		},
		watch: {
			msgBody(newval, oldval) {
				let curConversation = this.$store.getters[
					'ConversationProviders/state_curConversation'
				];
				if (
					!this.msgBodies.hasOwnProperty(curConversation.providerName)
				) {
					this.msgBodies[curConversation.providerName] = {};
				}
				this.msgBodies[curConversation.providerName][
					curConversation.conversationId
				] = newval;

				let _self = this.$store.state.plugins[NAME];

				_self.worker.postMessage({
					[NAME + '_setInnerState.msgBodies']: JSON.parse(
						JSON.stringify(this.msgBodies)
					)
				});
			}
		},
		template: '<span style="display: none;"></span>'
	};
};

const funcInputExtStr = funcInputExt.toString();

const funcInputExtObj = {
	args: funcInputExtStr.substring(
		funcInputExtStr.indexOf('(') + 1,
		funcInputExtStr.indexOf(')')
	),
	body: funcInputExtStr.substring(
		funcInputExtStr.indexOf('{') + 1,
		funcInputExtStr.lastIndexOf('}')
	)
};

onmessage = e => {
	let data = e.data;
	console.log(NAME, 'received from main', data);
	if (typeof data === 'string') {
		if (data === 'registered') {
			postMessage({
				ready: true,
				declareFunctionalities: ['inputExts'],
				inputExts: [
					{
						name: NAME + '-inputExt',
						component: funcInputExtObj
					}
				]
			});
		}
	} else if (typeof data === 'object') {
		if (data.hasOwnProperty(NAME + '_getInnerState.msgBodies')) {
			postMessage({
				[NAME + '_innerState.msgBodies']: innerState.msgBodies,
				resolveId: data.resolveId
			});
		}
		if (data.hasOwnProperty(NAME + '_setInnerState.msgBodies')) {
			innerState.msgBodies = data[NAME + '_setInnerState.msgBodies'];
		}
	}
};
